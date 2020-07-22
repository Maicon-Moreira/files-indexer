import React from "react";

export default function (props) {
  const result = props.data;
  const enterFolder = props.enterFolder;
  const path = result.path.split("/");
  path.shift();
  path.shift();
  const totalSize = props.totalSize;
  const barPercentage = `${((result.size / totalSize) * 100).toFixed(0)}%`;

  function convertSize(size) {
    if (size < 1024 ** 1) return `${(size / 1024 ** 0).toFixed(0)} bytes`;
    if (size < 1024 ** 2) return `${(size / 1024 ** 1).toFixed(0)} KB`;
    if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(0)} MB`;
    if (size < 1024 ** 4) return `${(size / 1024 ** 3).toFixed(0)} GB`;
  }

  function convertTime(time) {
    return new Date(time / 10 ** 6).toLocaleString();
  }

  // function convertTime(time) {
  //   return new Date(new Date() - new Date(time / 10 ** 6)).toLocaleString();
  // }

  return (
    <div
      key={result.path}
      className={"result " + result.type}
      onClick={() => enterFolder(path)}
    >
      <div className="left">
        <div className="name">{result.name}</div>
        <div className="path">{result.path}</div>
        <div className="accessTime">{convertTime(result.accessTime)}</div>
        <div className="modificationTime">
          {convertTime(result.modificationTime)}
        </div>
        <div className="creationTime">{convertTime(result.creationTime)}</div>
        <div className="size">{convertSize(result.size)}</div>
      </div>
      <div className="right">
        <div className="background" style={{ width: barPercentage }}></div>
      </div>
    </div>
  );
}
