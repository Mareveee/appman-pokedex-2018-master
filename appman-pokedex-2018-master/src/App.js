import React, { Component } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import './App.css'
import search from './search.png'
import cute from './cute.png'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%',
		height                : '70%',
    background            : COLORS.Colorless,
  }
};

function searchingFor(term){
  return function(x){
    return x.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      name:[],
      hp:[],
      hplevel:[],
      atk:[],
      weak:[],
      dm:[],
      damage:[],
      level:[],
      img:[],
      w:[],
      happy:[],
      mypock_name:[],
      mypock_hp:[],
      mypock_atk:[],
      mypock_weak:[],
      mypock_level:[],
      mypock_img:[],
      term:'',
      percentage:0,
      nametemp:[]
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderlevel = this.renderlevel.bind(this);
  }
  componentWillMount(){
    var self = this;
    let i
    axios.get('http://localhost:3030/api/cards')
  .then(function (response) {
    for(i=0;i<20;i++){
      if(response.data.cards[i].hp === 'None'){
        continue
      }else{
        self.setState({hp: self.state.hp.concat(response.data.cards[i].hp)})
        self.setState({name: self.state.name.concat(response.data.cards[i].name)})
        self.setState({img: self.state.img.concat(response.data.cards[i].imageUrl)})
        self.setState({dm: self.state.dm.concat(response.data.cards[i].attacks.length)})
        self.setState({w: self.state.w.concat(response.data.cards[i].weaknesses.length)})
        self.setState({atk: self.state.atk.concat(response.data.cards[i].attacks.length * 50)})
        self.setState({weak: self.state.weak.concat(response.data.cards[i].weaknesses.length * 100)})
        hp(response.data.cards[i].hp)
        dm(response.data.cards[i].attacks)
      }
    }
    level()
    self.setState({nametemp:self.state.name})
  })
  function hp(HP){
    if(HP >= 100){
      self.setState({hplevel: self.state.hplevel.concat(100)})
    }
    else{
      self.setState({hplevel: self.state.hplevel.concat(Number(HP))})
    }
  }
  function dm(DM){
    let i 
    let result = 0
    for(i=0;i<DM.length;i++){
      result = result+Number(DM[i].damage.slice(0,2))
    }
    self.setState({damage: self.state.damage.concat(result)})
  }
  function level(){
    let i
    for(i=0;i<self.state.hp.length;i++){
      self.setState({level: self.state.level.concat(
        Math.floor(((self.state.hp[i]/10) + (self.state.dm[i]/10) + 10 - (self.state.w[i]) )/5)
        )}) 
    }
  }
  }
  

  openModal() {
    this.setState({modalIsOpen: true});
    this.setState({term:''})
  }

  

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onChange(event) {
    this.setState({term:event.target.value})
  }
  renderlevel(level) {
    let i
    let lv=[]
    for(i=0;i<level;i++){
      lv.push(<img className="img" src={cute}/>)
    }
    return lv
  }
  checkpoke(i){
    return i
  }
  
  render() {
    const Filler = (props) =>{
      return <div className="filler" style={{width :props.percentage*2}}/>
    }
    const ProgressBar = (props) => {
      return (
        <div className="progress-bar">
        <Filler percentage={props.percentage}/>
        </div>
      )
    }
    return (
      <div className="App">
        <p align="center">My Pockdex</p>
        <div className="mypock">
        {this.state.mypock_name.map((item,i) => 
            <div className="MyCard">
            <img className="imgCard" src={this.state.mypock_img[this.state.mypock_name.indexOf(item)]} align="left" />
            {item} <button className="buttadd"
             onClick={
              ()=>{
                this.setState({name:this.state.name.concat(this.state.mypock_name[i])})
                this.setState({hplevel:this.state.hplevel.concat(this.state.mypock_hp[i])})
                this.setState({atk:this.state.atk.concat(this.state.mypock_atk[i])})
                this.setState({weak:this.state.weak.concat(this.state.mypock_weak[i])})
                this.setState({level:this.state.level.concat(this.state.mypock_level[i])})
                this.setState({img:this.state.img.concat(this.state.mypock_img[i])})
               
               this.state.mypock_name.splice(i,1)
               this.state.mypock_hp.splice(i,1)
               this.state.mypock_atk.splice(i,1)
               this.state.mypock_weak.splice(i,1)
               this.state.mypock_img.splice(i,1)
               this.state.mypock_level.splice(i,1)
               this.setState({mypock_name:this.state.mypock_name})
               this.setState({mypock_hp:this.state.mypock_hp})
               this.setState({mypock_atk:this.state.mypock_atk})
               this.setState({mypock_img:this.state.mypock_img})
               this.setState({mypock_level:this.state.mypock_level})
              }
              }
            >del</button><br/><br/>
              <div >hp <ProgressBar percentage={this.state.mypock_hp[this.state.mypock_name.indexOf(item)]}/></div>
                <div>str <ProgressBar percentage={this.state.mypock_atk[this.state.mypock_name.indexOf(item)]}/></div>
                <div>weak <ProgressBar percentage={this.state.mypock_weak[this.state.mypock_name.indexOf(item)]}/></div> 
                <div>{this.renderlevel(this.state.mypock_level[this.state.mypock_name.indexOf(item)])}</div>
            </div>
          )}
        </div>
        <div align="center">
        <button className="add" onClick={this.openModal}>ADD</button>
        <div className="bottom"></div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input className="Search" type="text" placeholder="Find pokemon" onChange={this.onChange} value={this.state.term}></input>
          <img className="imgsearch" src={search}/>
          <div>
          
          {this.state.name.filter(searchingFor(this.state.term)).map((item,i) => 
            <div className="Card">
            <img className="imgCard" src={this.state.img[this.state.name.indexOf(item)]} align="left" />
            {item} <button className="buttadd" 
            onClick={
              ()=>{
                  this.setState({mypock_name:this.state.mypock_name.concat(this.state.name[this.state.name.indexOf(item)])})
                  this.setState({mypock_hp:this.state.mypock_hp.concat(this.state.hplevel[this.state.name.indexOf(item)])})
                  this.setState({mypock_atk:this.state.mypock_atk.concat(this.state.atk[this.state.name.indexOf(item)])})
                  this.setState({mypock_weak:this.state.mypock_weak.concat(this.state.weak[this.state.name.indexOf(item)])})
                  this.setState({mypock_level:this.state.mypock_level.concat(this.state.level[this.state.name.indexOf(item)])})
                  this.setState({mypock_img:this.state.mypock_img.concat(this.state.img[this.state.name.indexOf(item)])})
                 
                 this.state.name.splice(i,1)
                 this.state.hplevel.splice(i,1)
                 this.state.atk.splice(i,1)
                 this.state.weak.splice(i,1)
                 this.state.img.splice(i,1)
                 this.state.level.splice(i,1)
                 this.setState({name:this.state.name})
                 this.setState({hplevel:this.state.hplevel})
                 this.setState({atk:this.state.atk})
                 this.setState({img:this.state.img})
                this.setState({level:this.state.level})
                  }
              }>add</button><br/><br/>
                <div >hp<ProgressBar percentage={this.state.hplevel[this.state.name.indexOf(item)]}/></div>
                <div>str<ProgressBar percentage={this.state.atk[this.state.name.indexOf(item)]}/></div>
                <div>weak<ProgressBar percentage={this.state.weak[this.state.name.indexOf(item)]}/></div> 
                <div>{this.renderlevel(this.state.level[this.state.name.indexOf(item)])}</div>
            </div>
          )}
          <br/>

          </div>
        </Modal>
      </div>
    )
  }
}

export default App
