import ReactWordcloud from 'react-wordcloud';


const words = [
  { text: 'told',    value: 64, },
  { text: 'mistake', value: 11, },
  { text: 'thought', value: 16, },
  { text: 'bad',     value: 17, }
];


const WordCloud = () =>
  <div> 
    ...
    <ReactWordcloud words={words} />
    ...
 </div>;

export default WordCloud;