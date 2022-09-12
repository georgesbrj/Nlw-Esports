 
 
interface ButtonProps{
  title: string;
 
}


 
 function Button(props: ButtonProps){
   return (
    <button>
      {props.title}
     
    </button>
   )
 }



function App() {

  return (
    <>
    <Button  title="Bem " />
    <Button title="Vindo "   />
    <Button title="ao React"  />
    
    </>

  )
}

export default App
