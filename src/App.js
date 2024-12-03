import { useState, useEffect } from "react";
import {EmojioneFlagForIndia} from "./sun";
function NavBar({darkMode, setDarkMode}){
  return(
    <div className="Heading flex bg-headCheck p-7 justify-between dark:bg-headDarkCheck">
      <h1 className="logo text-3xl  text-yellow-300 font-semibold border rounded-br-lg p-2">HaHaHub.</h1>
      <button className="modeButton rounded-full dark:shadow-xl dark:drop-shadow-xl text-headCheck bg-check dark:text-check dark:bg-headDarkCheck transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 p-2 text-2xl font-semibold mr-40" onClick={()=>{
        setDarkMode(!darkMode);
      }}>{!darkMode?'🔆Light' : '🌙Dark'}</button>
    </div>
  );
}
function JokeBody({fetchJoke, joke, error, handleClick}){ //<JokesDisplay joke={joke} error={error}/>
  const [setup, punchline] = joke.split(" - ");
  return (
    <div className="jokebody dark:bg-darkCheck dark:text-white bg-check flex flex-col gap-10">
      <JokesDisplay setup={setup} punchline={punchline} error={error}/>
      <div className="flex justify-center gap-10 mb-10">
        <JokeFetch fetchJoke={fetchJoke} />
        <Convertor handleClick={handleClick}/>
      </div>
    </div>
  );
}
function JokesDisplay({setup, punchline, error}){ 
  return (
    <div className="jokesdisplay flex justify-center text-5xl align-middle mx-28 h-96 mb-6 mt-16 bg-headCheck/70 dark:bg-headDarkCheck/70 rounded-3xl">
      {setup && punchline && (
        <p className="p-20 font-extrabold text-check dark:bg-headDarkCheck/70 rounded-3xl dark:text-check dark:shadow-xl shadow-2xl">
          <span className="text-check">{setup}</span> - <span className="text-yellow-300">{punchline}</span>
        </p>
      )}
      {error && <p className="text-yellow-300 p-20">{error}</p>}
    </div>
  );
}
function JokeFetch({fetchJoke}){
  return(
    <div className="jokefetch flex justify-center  h-20">
      <button onClick={fetchJoke} className="rounded-full p-5 shadow-xl drop-shadow-xl bg-headCheck text-check hover:dark:text-darkButtonCheck dark:bg-darkButtonCheck dark:hover:bg-check hover:bg-headCheck/50 hover:text-headCheck transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">Get me laughing!</button>
    </div>
  );
}
function Convertor({handleClick}){
  return(
    <div className="convertor flex justify-center  h-20 mb-5">
      <button onClick={handleClick} className="rounded-full p-5 shadow-xl drop-shadow-xl bg-headCheck text-check hover:dark:text-darkButtonCheck dark:bg-darkButtonCheck dark:hover:bg-check hover:bg-headCheck/50 hover:text-headCheck transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">Speak out loud!!</button>
    </div>
  );
}
function Ending(){
  return(
    <div className="ending flex justify-center text-check pt-8 gap-96 dark:bg-headDarkCheck bg-slate-900/90 h-20">
      <div className="links pr-24">Contact Us!</div>
      <div className="copyright"><span>Crafted with </span><span className="text-yellow-300">FUN!</span> </div>
      <div className="country pl-24 flex"><span className="text-xl"><EmojioneFlagForIndia/></span><span className="font-semibold text-base">IND</span></div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);   //for dark mode
  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
    
  }, [darkMode]);

  

  const [joke, setJoke] = useState("");   //joke api starts from here
  const [error, setError] = useState("");

  const fetchJoke = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://official-joke-api.appspot.com/random_joke", requestOptions)
    .then((response) => {
      if(!response.ok){
        throw new Error("Well, that was unexpected... Guess the ERROR decided to make an entrance!")
      }
      return response.json()})  // Convert response to JSON
    .then((data) =>{
      setJoke(`${data.setup} - ${data.punchline}`); // Update the state with the joke
        setError(""); // Clear any previous errors
    })
    
    .catch((error) => {
      setError("Uh-oh, looks like an error just showed up uninvited. Time to send it packing!");
      console.error(error);
    });
  };

  const handleClick= ()=>{
    const text = `${joke}`;

    const value = new SpeechSynthesisUtterance(text); //webApI interface in js that controls the generation and synthesis speech in apps

    window.speechSynthesis.speak(value); //property of global window object in js
  }


  return (
    <div className="App dark:bg-slate-900 scroll-smooth dark:text-white font-mono ">
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <JokeBody fetchJoke= {fetchJoke} joke={joke} error={error} handleClick={handleClick} />
      <Ending />
    </div>
  );
}

export default App;
