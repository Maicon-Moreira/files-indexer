
## File indexer (Deep Search)

File indexer is a utility with two main complementary uses:

 - Analyze folder and file sizes to locate unnecessarily large directories.
 - Perform indexed file and folder searches at very high speed.

## Demo

**Explorer:**
![Demo](https://i.ibb.co/cYJsmQ1/Captura-de-tela-de-2020-07-22-11-49-50.png)
My */home/maicon* folder

**Search:**
![Search demo](https://i.ibb.co/d5Ps8B4/Captura-de-tela-de-2020-07-22-11-50-39.png)
Search of the term "teste" inside my /home/maicon folder in **0.08** seconds.

## How to use

Create the index file:

    python3 index_creator.py 

Start the express server:

    cd server && yarn start

Start the react website:

    cd webpage && yarn start

That's it, the local server http://localhost:3000 will open in your browser.

Feel free to put the express server startup together with your system startup or use some local dns for the React server.



***MIT***

Done by [Maicon](https://www.linkedin.com/in/maicon-moreira-38ab691a4/) with ❤️


Translated with www.DeepL.com/Translator (free version)