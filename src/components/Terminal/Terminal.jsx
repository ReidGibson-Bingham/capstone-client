import React, { useState, useEffect, useRef } from 'react';
import './Terminal.scss';

const Terminal = (props) => {
  const [fontSize, setFontSize] = useState(16)
  const [output, setOutput] = useState([]);
  const outputContainerRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the output container when output changes
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [output]);

const frames = [
  `$$  $ n $  4 4  4 $ $ $ $ $ $$ $ $ $ $ $ $$$$$
$$$$  $ $    $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $
  4$$$$  $ $ $$$$ $ $$$$$$$$$$$
$$$$$$$          $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$$
  $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$$     $$  $$   $$ $$$ 
$ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $ $$$ $$$$$
$     $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $
        $$$$$$ $ $ $$ $ $ $$$$ $ $ $ $ $ $$$4   $$$

        $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $
        4$$$$  $ $ $$$$ $ $$$$$$$$$$$
      $$$$$$$          $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$$
        $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$$     $$  $$   $$ $$$ $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$
        `,
  `$$  $ n $  4 4  4 $ $ $ $ $ $$ $ $ $ $ $ $
  $ $    $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $
  $  $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $   $ $ $$$$
   $    $  $ $ $ $ $ $$$ $ $ $$ $$$$  $$$ $ $ $
   $$$  $$$$ $$ $$$$$ $$ $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ 
  $ $$ $ $ $ $$$$ $ $ $$ $$$$ $ $$$$$     $$  $$   $$ $$$ 
$ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $ $$$ $$$$$
$        $ $ $$$$ $ $ $$ $$$$ $ $$$$ $ $ $$ $$ $
        $$$$$$ $ $ $$ $ $ $$$$ $ $ $ $ $ $$$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
        $ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$$4$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
  `,
  `$$  $ n $  4 4  4 $ $ $ $ $ $$ $ $ $ $ $ $
  $ $    $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
  $ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
  $ $$$ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$ $ $ $ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$$ $$ $ $ $ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
                $ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
  $ $$ $ $ $ $$$$ $ $ $$ $ $ $$$$$     $$  $$
$$ $ $ $ $$$$ $ $ $$ $$$ $ $ $$ $$$  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $ $$ $ $ $$$$$   $$ $ $ $ $$$$ $ $ $$ $ $ $$ $$ $ $ $ $$$$ $ $ $$ $$$ $ $ $$ $$$  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  
  `,
  `$ $$
    $  $$$$$  $ $  $$$$$  $    $
 $  $$  $ $  $ $  $$$ $  $$$ $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
      $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
 $ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
     $ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
 $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
  $ $$ $ $ $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
    $ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $    $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
    $ $$ $ $ $ $  $  $    $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
 $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
    $ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
    $ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
    $ $$ $ $ $ $  $  $ $$$    $  $$$ $$$$$$$$$ $$ $$$    $$$ $ $ $$$$$$$$$$$
  `,
`-__- $$$$$    $  $$$ $$$$$ $ $ $ $$$ $ $ $ $ $ $ $ $ $$$$
{o,o}$   $$$    $  $$$ $$$$$$$$$ $$ $$$    $$$ $ $ $$
|)__)$$$    $  $$$ $$$$$$$$$ $$ $$$    $$$ $ $ $$$$$$$$$$$
-"-"-- $   $  $ $ $ $$$   $$$$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $$$$$$$$$ $$ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $$$$$$$$$ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $$$ $ $ $$$$$$$$$$ $ $    $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $ $$ $ $$$$$$$$$ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $`,
`$ $$
$  $$$$$  $ $  $$$$$  $    $
$  $$  $ $  $ $  $$$ $  $$$ $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
 $ $   $  $ $ $ $$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $ $ $ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $$$ $ $ $$ $ $    $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $    $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $ 
`,
`-__-  $ $ $$ $$ $  $$ $$$$ $ $ $$ $ $ $ $ $ $4
{o,o}  $$$$ $ $ $ $ $$$ $ $$ $ $ $$ $ $$$$$$$$$$$$
|)__)  $$ $ $ $$ $$$$$ $ $    $ $$$$$ $ $ $ $$ $$$$ 
-"-"-- $$$ $$$$ $   $ $$$ $$$ $ $ $$$$ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $   $  $ $ $ $$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $ $ $ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$  $$ $$$ $ $$$$ $ $ $$ $$ $
$ $   $  $ $ $ $$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $ $ $ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$  $ $$ 
$$ $$ $ $$$$ $ $$ $$ $$ $ $ $ $$ $$$ $ $ $ $ $$`
,
`$ $$
$  $$$$$  $ $  $$$$$  $    $
$  $$  $ $  $ $  $$$ $  $$$ $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
 $ $   $  $ $ $ $$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $ $ $ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $$$ $ $ $$ $ $    $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $    $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $ 
`,
`$ $$
$  $$$$$  $ $  $$$$$  $    $
$  $$  $ $  $ $  $$$ $  $$$ $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
  $ $$ $ $ $ $$   $$$$  $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
 $ $   $  $ $ $       $$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$$$$$    $  $$$ $ $ $ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $      $ $  $  $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $$$ $ $    $$ $ $    $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $    $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$       $ $ $$$$ $ $ $$ $$$ $  $    $$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $ $ $ $    $$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$    $ $$ $ $$ $$    $$  $$$ $ $ $
$ $$ $ $ $ $  $   $$$$$$$$  $ 
`,
`$$$$$$$$ $$$$$$$    $$$ $$$  $$ $$$$$$$$$$$$$$
  $$$$$$ $$$$$$$   $$$$$$$ $$$$$$$$$$$$$$ $$$$$$$
  $$$$$$$$$   $$$$$   $$$$$$$$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$
  $$$    $$  $ $ $$$$$$$ $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$ $$$$$$$
  $$$$$$$$$   $$$$$ $$     $$$$$$$$ $$$$$$$$$$$$$$ $$$$$$$$$$$$$$
  $$$    $$  $ $ $$$$$$$ $$$$$$$  $$$$$$
$$$                    $ $$$$$$$$$$$$    $$  $ $ $$$$$$$ 
  $$$$$$$$$   $$$$$ $$     $$$$$$$$ $$$$$$$$$$$$$$ $$$$$$$$$$$$$$
  $$$$$$$$$   $$$$$ $$     $$$$$$$$ $$$$$$$$$$$$$$ $$$$$$$$$$$$$$
  $$$$$$$  $$$$$$$ $$$$$$$     $$ $$$$$$$$$$$ 
  $$$$$$$$$$$$$$$$$$  $ $ 4$$$$     $$$$$$$$ $$$$$$$$$$$$$$ $$$$$$
  $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$      $$$$$$$     $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$ $$$$$$$
  $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$$$$      $$$$$$$$$$$$$$$$$$$$$$$$$$$  $$$$$$$ $$$$$$$$$$$$$$
  $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$$$$$$$$  $$$$$$$ $$$$$$$$$$$$$$$$$$$$$  $$$$$$$ $$$$$$$$$$$$$$
  $$$$$$$  $$$$$$$ $$$$$$$$$$$$$$$$$$$$$  $$$$$$$ $$$$$$$$$$$$$$
  `,
`$ $$
$  $$$$$  $ $  $$$$$  $    $
$  $$  $ $  $ $  $$$ $  $$$ $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $$
  $ $$ $ $ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $            $$$
 $ $   $  $ $ $ $$$   $$$$$$ $ $$$ $$$$$ $ $$ $ $   $   $$$$
$$ $ $ $ $$$    $  $$$ $$$$$$$$$ $$ $$$    $$$ $ $ $$$$$$$$$$$
$ $$ $ $ $ $  $  $ $$$$ $ $$$$$$$$$ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $$$ $ $ $$$$$$$$$$ $ $    $ $ $ $$$    $   $4
$ $$ $ $ $ $  $ $$ $ $$$$$$$$$ $ $$$$ $ $ $$ $  $  $ $ $ $ $ $$$ $$
$ $ $ $$$$ $ $ $$ $$$ $ $$$$ $ $ $$ $$ $
$ $$ $$$ $   $  $ $ $ $ $ $$$ $ $ $$ $ $   $   $$$$
$ $$ $ $ $ $$$    $ $$ $ $$ $$$$  $$$ $ $ $
$ $$ $ $ $ $  $  $ 
`,
  ];

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    // Update the frame every 500 milliseconds
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
      setFontSize(Math.floor(Math.random() * 34) + 30)
    }, 250);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [frames.length]);

  const charColors = [
    'rgba(0, 128, 0, 0.11)',
    'rgba(255, 0, 0, 0.11)',
    'rgba(0, 0, 255, 0.11)',
    '#00800057',
    '#00800033',
    '#00804c1a',
    '#00804159',
    '#00804129',
    '#00801c29',
    '#171b17c9'
  ];
  
  const getColorForChar = () => {
    // Return a random color from the array
    return charColors[Math.floor(Math.random() * charColors.length)];
  };

  return (
    <div className="terminal">
    <div 
      className="terminal__output" 
      ref={outputContainerRef}
      style={{ fontFamily: 'monospace', fontSize: `${fontSize}px`, backgroundColor: '#000000' }}
    >
      {frames[currentFrame].split('').map((char, index) => (
        <span key={index} style={{ color: getColorForChar() }}>
          {char}
        </span>
      ))}
    </div>
  </div>
  );
};

export default Terminal;


