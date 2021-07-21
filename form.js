class Form{
  constructor(){
    this.greetings = createElement('h3')
    this.title=createElement('h1')
    this.inp = createInput('Enter Name');
    this.button2 = createButton('Login');
  }
  hide(){
    this.button1.hide() 
    this.greetings.hide()
    this.title.hide()
  }
  display(){
    
    this.inp.position(width/2-200,100);
    this.inp.size(150,50);

     this.title= createElement('h1','Lock & Key');
      this.title.style('color', '#f25252');
    this.title.position(width/2-150,10);
    
    this.button2.position(width/2,100)
    this.button2.size(50,60)
    this.button2.mousePressed(()=>{
      this.inp.hide()
      this.button2.hide()
  
      this.greetings = createElement('h1', 'Hello, '+this.inp.value());
      this.greetings.style('color', '#03a2e7');
      this.greetings.position(width/2-200,70);

      header1.visible = true

      this.button1 = createButton('Level 1'); 
      this.button1.position(width/2-60,height-130)
      this.button1.size(100,60)
      this.button1.style('backgroundColor', '#03a2e7');
      this.button1.mousePressed(()=>{
        gameState = "level1"
      })
    })
  }
}