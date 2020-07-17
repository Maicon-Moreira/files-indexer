import os
import sys
import json
import sys

total_files = 0
ignore = ['node_modules', '.git']
num_errors = 0


def get_size(obj, seen=None):
    """Recursively finds size of objects"""
    size = sys.getsizeof(obj)
    if seen is None:
        seen = set()
    obj_id = id(obj)
    if obj_id in seen:
        return 0
    # Important mark as seen *before* entering recursion to gracefully handle
    # self-referential objects
    seen.add(obj_id)
    if isinstance(obj, dict):
        size += sum([get_size(v, seen) for v in obj.values()])
        size += sum([get_size(k, seen) for k in obj.keys()])
    elif hasattr(obj, '__dict__'):
        size += get_size(obj.__dict__, seen)
    elif hasattr(obj, '__iter__') and not isinstance(obj, (str, bytes, bytearray)):
        size += sum([get_size(i, seen) for i in obj])
    return size


def stat_to_json(s_obj):
    return {k: getattr(s_obj, k) for k in dir(s_obj) if k.startswith('st_')}


def index_directory(directory):
    global total_files
    global num_errors

    index = []
    size = 0
    num_files = 0

    # para cada arquivo ou pasta da pasta
    try:
        with os.scandir(directory) as dir_entries:
            for entry in dir_entries:
                name = entry.name
                path = entry.path
                stat = entry.stat()
                stat = stat_to_json(stat)

                if name not in ignore:
                    if entry.is_dir():
                        [content, content_size, content_files] = index_directory(
                            directory+'/'+name)

                        folder_actual_size = content_size + stat['st_size']
                        size += folder_actual_size
                        num_files += content_files

                        index.append({
                            'name': name,
                            'path': path,
                            'type': 'folder',
                            'size': folder_actual_size,
                            'access_time': stat['st_atime_ns'],
                            'modification_time': stat['st_mtime_ns'],
                            'creation_time': stat['st_ctime_ns'],
                            'content_files': content_files,
                            'content': content
                        })
                    else:
                        size += stat['st_size']
                        num_files += 1
                        total_files += 1
                        index.append({
                            'name': name,
                            'path': path,
                            'type': 'file',
                            'size': stat['st_size'],
                            'access_time': stat['st_atime_ns'],
                            'modification_time': stat['st_mtime_ns'],
                            'creation_time': stat['st_ctime_ns'],
                        })

    except:
        num_errors += 1
        print('erro', num_errors)

    return [index, size, num_files]


(index, size, num_files) = index_directory('/home')
# (index, size, num_files) = index_directory('..')

print(f'{size} bytes com {num_files} arquivos')
print(f'{get_size(index)} bytes de RAM utilizados')

with open('./webpage/src/data.js', 'w') as file:
    file.write('module.exports = '+json.dumps({
        'index': index,
        'size': size,
        'num_files': num_files
    }))
