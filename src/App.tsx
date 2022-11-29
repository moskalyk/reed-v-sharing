import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.scss";

import FadeIn from 'react-fade-in';

import { Fluence, KeyPair } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { getRelayTime } from "./_aqua/getting-started_ttl";
import { sayHello, registerHelloPeer } from './_aqua/getting-started_hello';

import { ReactMic } from "react-mic";
import { Web3Storage } from 'web3.storage'

import stringCard from './stack8.png'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import {ethers} from 'ethers'

const urbit = require('urbit-ob');

const relayNode = krasnodar[4];

const relayNodes = [krasnodar[4], krasnodar[5], krasnodar[6]];

let cards;

let tarot = [
  ['The Fool','https://www.trustedtarot.com/img/cards/the-fool.png'],
  ['The Magician','https://www.trustedtarot.com/img/cards/the-magician.png'],
  ['The High Priestess','https://www.trustedtarot.com/img/cards/the-high-priestess.png'],
  ['The Empress','https://www.trustedtarot.com/img/cards/the-empress.png'],
  ['The Emperor','https://www.trustedtarot.com/img/cards/the-emperor.png'],
  ['The Hierophant','https://www.trustedtarot.com/img/cards/the-heirophant.png'],
  ['The Lovers','https://www.trustedtarot.com/img/cards/the-lovers.png'],
  ['The Chariot','https://www.trustedtarot.com/img/cards/the-chariot.png'],
  ['Fortitude','https://www.trustedtarot.com/img/cards/strength.png'],
  ['The Hermit','https://www.trustedtarot.com/img/cards/the-hermit.png'],
  ['Wheel Of Fortune','https://www.trustedtarot.com/img/cards/wheel-of-fortune.png'],
  ['Justice','https://www.trustedtarot.com/img/cards/justice.png'],
  ['The Hanged Man','https://www.trustedtarot.com/img/cards/the-hanged-man.png'],
  ['Death','https://www.trustedtarot.com/img/cards/death.png'],


  ['Temperance','https://www.trustedtarot.com/img/cards/temperance.png'],
  ['The Devil','https://www.trustedtarot.com/img/cards/the-devil.png'],
  ['The Tower','https://www.trustedtarot.com/img/cards/the-tower.png'],
  ['The Star','https://www.trustedtarot.com/img/cards/the-star.png'],
  ['The Moon','https://www.trustedtarot.com/img/cards/the-moon.png'],
  ['The Sun','https://www.trustedtarot.com/img/cards/the-sun.png'],
  ['Judgement','https://www.trustedtarot.com/img/cards/judgement.png'],
  ['The World','https://www.trustedtarot.com/img/cards/the-world.png'],


  ['King of Cups','https://www.trustedtarot.com/img/cards/king-of-cups.png'],
  ['Queen of Cups','https://www.trustedtarot.com/img/cards/queen-of-cups.png'],
  ['Knight of Cups','https://www.trustedtarot.com/img/cards/knight-of-cups.png'],
  ['Page of Cups','https://www.trustedtarot.com/img/cards/page-of-cups.png'],
  ['X of Cups','https://www.trustedtarot.com/img/cards/ten-of-cups.png'],
  ['IX of Cups','https://www.trustedtarot.com/img/cards/nine-of-cups.png'],
  ['VIII of Cups','https://www.trustedtarot.com/img/cards/eight-of-cups.png'],
  ['VII of Cups','https://www.trustedtarot.com/img/cards/seven-of-cups.png'],
  ['VI of Cups','https://www.trustedtarot.com/img/cards/six-of-cups.png'],
  ['V of Cups','https://www.trustedtarot.com/img/cards/five-of-cups.png'],
  ['IV of Cups','https://www.trustedtarot.com/img/cards/four-of-cups.png'],
  ['III of Cups','https://www.trustedtarot.com/img/cards/three-of-cups.png'],
  ['II of Cups','https://www.trustedtarot.com/img/cards/two-of-cups.png'],
  ['Ace of Cups','https://www.trustedtarot.com/img/cards/ace-of-cups.png'],
  ['King of Swords','https://www.trustedtarot.com/img/cards/king-of-swords.png'],
  ['Queen of Swords','https://www.trustedtarot.com/img/cards/queen-of-swords.png'],
  ['Knight of Swords','https://www.trustedtarot.com/img/cards/knight-of-swords.png'],
  ['Page of Swords','https://www.trustedtarot.com/img/cards/page-of-swords.png'],
  ['X of Swords','https://www.trustedtarot.com/img/cards/ten-of-swords.png'],
  ['IX of Swords','https://www.trustedtarot.com/img/cards/nine-of-swords.png'],
  ['VIII of Swords','https://www.trustedtarot.com/img/cards/eight-of-swords.png'],
  ['VII of Swords','https://www.trustedtarot.com/img/cards/seven-of-swords.png'],
  ['VI of Swords','https://www.trustedtarot.com/img/cards/six-of-swords.png'],
  ['V of Swords','https://www.trustedtarot.com/img/cards/five-of-swords.png'],
  ['IV of Swords','https://www.trustedtarot.com/img/cards/four-of-swords.png'],
  ['III of Swords','https://www.trustedtarot.com/img/cards/three-of-swords.png'],
  ['II of Swords','https://www.trustedtarot.com/img/cards/two-of-swords.png'],
  ['Ace of Swords','https://www.trustedtarot.com/img/cards/ace-of-swords.png'],
  ['King of Wands','https://www.trustedtarot.com/img/cards/king-of-wands.png'],
  ['Queen of Wands','https://www.trustedtarot.com/img/cards/queen-of-wands.png'],
  ['Knight of Wands','https://www.trustedtarot.com/img/cards/knight-of-wands.png'],
  ['Page of Wands','https://www.trustedtarot.com/img/cards/page-of-wands.png'],
  ['X of Wands','https://www.trustedtarot.com/img/cards/ten-of-wands.png'],
  ['IX of Wands','https://www.trustedtarot.com/img/cards/nine-of-wands.png'],
  ['VIII of Wands','https://www.trustedtarot.com/img/cards/eight-of-wands.png'],
  ['VII of Wands','https://www.trustedtarot.com/img/cards/seven-of-wands.png'],
  ['VI of Wands','https://www.trustedtarot.com/img/cards/six-of-wands.png'],
  ['V of Wands','https://www.trustedtarot.com/img/cards/five-of-wands.png'],
  ['IV of Wands','https://www.trustedtarot.com/img/cards/four-of-wands.png'],
  ['III of Wands','https://www.trustedtarot.com/img/cards/three-of-wands.png'],
  ['II of Wands','https://www.trustedtarot.com/img/cards/two-of-wands.png'],
  ['Ace of Wands','https://www.trustedtarot.com/img/cards/ace-of-wands.png'],
  ['King of Pentacles','https://www.trustedtarot.com/img/cards/king-of-pentacles.png'],
  ['Queen of Pentacles','https://www.trustedtarot.com/img/cards/queen-of-pentacles.png'],
  ['Knight of Pentacles','https://www.trustedtarot.com/img/cards/knight-of-pentacles.png'],
  ['Page of Pentacles','https://www.trustedtarot.com/img/cards/page-of-pentacles.png'],
  ['X of Pentacles','https://www.trustedtarot.com/img/cards/ten-of-pentacles.png'],
  ['IX of Pentacles','https://www.trustedtarot.com/img/cards/nine-of-pentacles.png'],
  ['VIII of Pentacles','https://www.trustedtarot.com/img/cards/eight-of-pentacles.png'],
  ['VII of Pentacles','https://www.trustedtarot.com/img/cards/seven-of-pentacles.png'],
  ['VI of Pentacles','https://www.trustedtarot.com/img/cards/six-of-pentacles.png'],
  ['V of Pentacles','https://www.trustedtarot.com/img/cards/five-of-pentacles.png'],
  ['IV of Penatcles','https://www.trustedtarot.com/img/cards/four-of-pentacles.png'],
  ['III of Pentacles','https://www.trustedtarot.com/img/cards/three-of-pentacles.png'],
  ['II of Pentacles','https://www.trustedtarot.com/img/cards/two-of-pentacles.png'],
  ['Ace of Pentacles','https://www.trustedtarot.com/img/cards/ace-of-pentacles.png'],
]

const n3pthora = [
  ['Strength','https://i.ibb.co/7Ktj6vr/0x01-strength.png" alt="0x01-strength','Strength of Love providing support to see with courage in points of massive potential to make impact.'],
  // ['Strength','https://i.ibb.co/7Ktj6vr/0x01-strength.png" alt="0x01-strength','Strength of Love providing support to see with courage in points of massive potential to make impact.'],
  ['Community','https://i.ibb.co/XYBgMtR/0x02-community.png','Time to take a stroll in the community, evaluate bias, see what what guides you and make better judgements for inspiring double edged decisions.'],
  ['Shared Emotion','https://i.ibb.co/Y70kh0n/0x03-shared-emotion.png','Considering the fox and the swan totem to find moments of time to share emotions of free will in contemplating kindness. Might be time for a gift.'],
  ['Past Obstacles','https://i.ibb.co/3f4JcX4/0x04-past-obstacles.png','Moving past an obstacle, allowing one to give rise to new opportunity in the little details. Appreciate a cloud, a plant, a tree.'],
  ['Chariot Moving','https://i.ibb.co/cDwQQGh/0x05-dapr-chariot.png','Time to move forward with the dark & light of the chariot, giving rise to the star alignments, responsive to the woven nature of life.'],
]

const spreadTypes = [
'Past-Present-Future',
'9-Card Jung',
'Celtic Cross',
]

const cardStorage = [
  localStorage.getItem(String(0)),
  localStorage.getItem(String(1)),
  localStorage.getItem(String(2)),
  localStorage.getItem(String(3)),
  localStorage.getItem(String(4)),
  localStorage.getItem(String(5)),
  localStorage.getItem(String(6)),
  localStorage.getItem(String(7)),
]

class Bar {
  html
  id
  constructor(id, cycle, color){
    this.html = <div className="chart">
                <div className={`bar bar-30 ${color}`}>
                    <div className="face top">
                        <div id={`bar-cycle-${id}-top`} className="growing-bar"></div>
                    </div>
                    <div className="face side-0">
                        <div id={`bar-cycle-${id}-bottom`} className="growing-bar"></div>
                    </div>
                    <div className="face floor">
                        <div id={`bar-cycle-${id}-left`} className="growing-bar"></div>
                    </div>
                    <div className="face side-a"></div>
                    <div className="face side-b"></div>
                    <div className="face side-1">
                        <div id={`bar-cycle-${id}-right`} className="growing-bar"></div>
                    </div>
                </div>
                <h1 className="title">{cycle}</h1>
                <br/>
            </div>
    this.id = id
  }
  open(){
    return this.html;
  }
  static accelerate(id, velocity){
    try{
      if(document != null){
        // console.log(`bar-cycle-${id}-top`)
        // console.log(document.getElementById(`bar-cycle-${id}-top`))
        document.getElementById(`bar-cycle-${id}-top`)!.style.width = `${velocity}%`
        document.getElementById(`bar-cycle-${id}-bottom`)!.style.width = `${velocity}%`
        document.getElementById(`bar-cycle-${id}-left`)!.style.width = `${velocity}%`
        document.getElementById(`bar-cycle-${id}-right`)!.style.width = `${velocity}%`
      }
    }catch(e){
      console.log(e)
    }
  }
  static close(id){
    if(document != null){
      document.getElementById(`bar-cycle-${id}-top`)!.style.width = '0%'
      document.getElementById(`bar-cycle-${id}-bottom`)!.style.width = '0%'
      document.getElementById(`bar-cycle-${id}-left`)!.style.width = '0%'
      document.getElementById(`bar-cycle-${id}-right`)!.style.width = '0%'
    }
  }
}

function Reed(props) {

  const pullCards = () => {
    console.log('pulling')
    props.setRenderer(2)
    count = 0
    props.setAssembled(false)
    clearInterval(intervalPull)
  }

  return(
    <div className="App">
        {/*<canvas id="ring"></canvas>*/}
        <h1 className="title">Reed</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <a target="_blank" style={{cursor: 'pointer'}}href={"https://github.com/deep6org/reed-terms-and-consent/blob/main/README.md"}><p>consent to terms</p></a>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <FadeIn>
        {/*<img style={{width: '30%'}}src="https://i.ibb.co/FxLPhpg/IMG-6928.gif"/>*/}
          <div className="container">
            <div className="vertical-center">
              <div className="btn btn__secondary" onClick={()=> pullCards()}><a><p>i n t e n t i o n</p></a></div>
            </div>
          </div>
        <br/>
        </FadeIn>
        {/*TODO: banner with clock aligned with wheel and 9/6*/}
        <Banner/>
    </div>
  )
}

function CardMemStore() {
  return 
}

// TODO: fix with multi-spread
let oneCard = null
let twoCard = null
let threeCard = null
function oneOf(i) {
    let cards = [oneCard,twoCard,threeCard]
    // let cards = [49,27,13]
    for(let j = 0; j < cards.length; j++) {
        if (cards[j] != null && cards[j] == i){
            return false;
        }
    }
    return true
}

const matter = async (peerId, deckNumeric, compute = 'φ') => {
  let number;
  if(compute == '~'){
    // looped, 
    // computers, seeded from card shared secret
  }else {
    console.log(peerId)
    console.log(deckNumeric)
    const relayTime = await getRelayTime(peerId)
    // number = Math.floor(Array.from((Array(relayTime % deckNumeric).keys()).filter().reduce((x,y) => x + Math.abs(Math.tan(y)))%deckNumeric)
    number = Math.floor((Array.from(Array(relayTime % deckNumeric).keys()).filter((i) => {console.log(oneOf(i)); return oneOf(i)})).reduce((x,y) => x + Math.abs(Math.tan(y)))%deckNumeric)
  }
  return number
}

let count = 0; // who's tweeting off my alt
let deck = 0; // 1) What
let intervalPull;
function Spread(props){

  const [holoDeck, setHoloDeck] = useState<any>()
  // hack
  const [past, setPast] = useState<any>()
  const [present, setPresent] = useState<any>()
  const [future, setFuture] = useState<any>()

  const stake = async (cardStake, context) => {
    console.log('staking')
    console.log(cardStake)

    const nonce = localStorage.getItem('nonce')

    if(nonce != null ){

    // Array(8).

      Array.from(Array(8).keys()).map((i) => {
        const stored = localStorage.getItem(String(i % 8))
        if(stored != null){
          localStorage.setItem(String(Number(nonce) % 8), cardStake);
          localStorage.setItem(`time:${String(Number(nonce) % 8)}:${context}`, String(Date.now()))
        } else {
          localStorage.setItem(String(Number(nonce) % 8), cardStake);
          localStorage.setItem(`time:${String(Number(nonce) % 8)}:${context}`, String(Date.now()))
        }
      })

      localStorage.setItem('nonce', String(Number(nonce)+1))
    }
  }

  const see = () => {
    console.log('see')
    props.setRenderer(4)
  }

  // const pullCards = async() => {
  //   console.log('pulling')
  //   // connnect to wallet

  //   // MetaMask requires requesting permission to connect users accounts
  //   await provider.send("eth_requestAccounts", []);

  //   const signer = provider.getSigner()

  //   console.log(signer)

  //   const sdk: APWineSDK = new APWineSDK({ provider, signer, network: 1 })
  //   await sdk.ready

  //   props.setRenderer(2)
  // }

  useEffect(() => {
    if(!props.assembled){
      intervalPull = setInterval(async () => {

        let deckNumeric;
        let number;

        if(props.deck == 0){
          deckNumeric = 78
          cards = tarot
        } else {
          deckNumeric = 5
          cards = n3pthora
        }


        switch(count){
          case 1:
            number = await matter(props.relayNode.peerId, deckNumeric)
            oneCard = number
            // document.getElementsByClassName('card')[0].style.backgroundUrl = 'https://www.trustedtarot.com/img/cards/strength.png'
            setPast(
              <>
                <div className="wrapper" >
                <p className="sub">past</p>
                <div className={`card ${'charizard'} animated`}>
                  <img width="100%" src={cards[number][1]} />
                </div>
                <div className="botn sub" onClick={() => stake(cards[number][1], 'past')}><a href="#">Stake</a></div>
                </div>
              </>
              )

            break
          case 2:
            number = await matter(props.relayNode.peerId, deckNumeric)
            twoCard = number
            setPresent(
              <>
              <div className="wrapper" >
                <p className="sub">present</p>
                <div className="card mewtwo animated">
                  <img width="100%" src={cards[number][1]} />
                </div>
                <div className="botn sub" onClick={() => stake(cards[number][1], 'present')}><a href="#">Stake</a></div>
                </div>
              </>
              )

            break
          case 4:
            number = await matter(props.relayNode.peerId, deckNumeric)
            threeCard = number
            setFuture(
              <>
              <div className="wrapper" >
                <p className="sub">future</p>
                <div className="card eevee animated">
                  <img width="100%" src={cards[number][1]} />
                </div>
                <div className="botn sub" onClick={() => stake(cards[number][1], 'future')}><a href="#">Stake</a></div>
                </div>
              </>
              )

            break
          default:
            break;
        }
        count ++
      }, 1260)
      props.setAssembled(true)
    }
  })
  return(
    <>
      <h1 className="title">Spread</h1>
        {/*<img width={"120%"} height={'100%'} src={deck['The Magician']}/>*/}
      <br/>
      <br/>
      <br/>
      <br/>
        <div className="container">
            <div className="vertical-center">
              <div className="btn btn__secondary" onClick={()=> see()}><p>s e e &nbsp;&nbsp; s t a k e</p></div>
            </div>
          </div>
        <FadeIn>
        <section className="cards">
        {past}
        {present}
        {future}
        </section>
        </FadeIn>
      <Banner/>
    </>
  )
}

// TODO: fix rootStore
let remote = false;
function RootStore(index, storage = localStorage) {

  if(remote){
    console.log('RUNNING_REMOTE')
    // return 
    const time = storage.getItem(`time:${index % 8}`)
    const cursor = storage.getItem(`share:cards:${index}`)

    return cursor != null ? {cursor: cursor, time: time} : undefined
  }
  const cursor = storage.getItem(index)
  const time = storage.getItem(`time:${index % 8}`)
  // console.log('time')
  // console.log(`time:${index % 8}`)
  // console.log(time)
  return cursor != null ? {cursor: cursor, time: time} : undefined
}

function ShareStore(index, storage = localStorage) {
  console.log('share')
  console.log('share')
  // storage.setItem(`share:cards${index % 8}`, peerId)
  const shared = storage.getItem(`share:cards${index % 8}`)
  console.log(shared)
  return shared != null ? shared : undefined
}

function Light(){}

function Aura(context, storage = localStorage) {
  let tri: any = []
  for(let i = 0; i < 8; i++){
    if(storage.getItem(`time:${i % 8}:${context}`) != undefined){
      tri.push(storage.getItem(`time:${i % 8}:${context}`))
    }
  }
  return tri
}

Light.prototype.past = function(){
  // console.log('PAST')
  return Aura('past')
}

Light.prototype.present = function(){
  return Aura('present')
}

Light.prototype.future = function(){
  return Aura('future')
}

function stem(seed){
  console.log('STEM')
  const head = seed[0]
  const tail = seed[seed.length - 1]
  console.log(head)
  console.log(tail)
  // Number
  const date1 = Number(new Date(head));
  const date2 = Number(new Date(tail));
  // Math.abs(date2 - date1)
  console.log('date1')

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  console.log(diffDays)
  // console.log(diffDays == NaN)
  // return isNaN(diffDays) ? 1 : diffDays 
  return seed.length 
}

function Apple(seed, context){
  console.log(context)
  console.log('seed')
  console.log(seed)
  const rate = 7.5 // 28 days
  // const date1 = new Date('7/13/2010');
  const span = stem(seed)
  console.log('span')
  console.log(span)
  // const date1 = new Date('7/13/2010');
  const date1 = Number(new Date(Date.now()));
  const date2 = Number(new Date(new Date(new Date().getTime()+(28*24*60*60*1000))));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");
  console.log(rate / span * 13.333)
  return rate / span * 13.333
}
function Banner(){

  useEffect(() => {
    // const dropdownComponent1 = 

  })

  return(
    <div className="banner-whl">
          {/*<span className="dial-in">☿</span><span className="blink_me">⛢</span><span className="to-dial-in">☉</span>*/}
      </div>
  )
}

let varelayPeerIdInput = ''
let vapeerIdInput = ''
let cd = ''
function Audio(props: any) {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [helloMessage, setHelloMessage] = useState<string | null>(null);
    const [relayPeerIdInput, setRelayPeerIdInput] = useState<string>('');
    const [peerIdInput, setPeerIdInput] = useState<string>('');

      const [tube, setTube] = useState(0)
  const [horo, setHoro] = useState(false)
  const [record, setRecord] = useState(false)
  const [recordState, setRecordState] = useState(false)
  const [myAudioSrc, setMyAudioSrc] = useState<string[]>([]);
  const [audioStack, setAudioStack] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])

  const click = async () => {
    console.log(getAccessToken())
    switch(tube){
    case 0:
      start()
      break;
    case 1:
      stop()
      break;
    }

    setTube(current => {
      return current + 1
    })

    if(tube >= 1) {
      setTube(0)
      setRecord(false)
    }
  }

  const start = () => {
    console.log('start')
    setRecord(true)
  }

  const stop = () => {
    console.log('stop')
    setRecord(false)
  }

  async function storeFiles (files: any[], helloBtnOnClick: any) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  // console.log(peerIdInput)
  // console.log(relayPeerIdInput)
  // const res = await sayHello(vapeerIdInput, varelayPeerIdInput);
  // console.log(res)
  cd = cid
  helloBtnOnClick()
  return cid
}

  const onStop = async (recordedBlob: any) => {
    console.log("recordedBlob is: ", recordedBlob);
    console.log("peerIdInput is: ", peerIdInput);
    console.log("relayPeerIdInput is: ", relayPeerIdInput);
    var url = URL.createObjectURL(recordedBlob.blob);
    // setMyAudioSrc(url);
    // console.log(url)
    setMyAudioSrc(current => [...current, ...[url]])
    await storeFiles(makeFileObjects(recordedBlob), helloBtnOnClick)
    // await storeFiles(makeFileObjects({test: 'radio'}))
  };
      useEffect(() => {
        const audio = myAudioSrc.map((audioEl) => {
          return <audio controls id="myAudio" src={audioEl}></audio>
        })
        setAudioStack(audio)
      }, [myAudioSrc])

    const connect = async (relayPeerId: string) => {
        console.log('setting')
        console.log(relayPeerId)
        // console.log(relayPeerId)
        // props.setRelayPeerIdInput(relayPeerId)
        // console.log(props.relayPeerId)
        // relayPeerIdInput = 
        try {
            await Fluence.start({ connectTo: relayPeerId });
            setIsConnected(true);
            // Register handler for this call in aqua:
            // HelloPeer.hello(%init_peer_id%)
            registerHelloPeer({
                hello: (from) => {
                    setHelloMessage('Hello from: \n' + from);
                    return ""+[RootStore(0)?.cursor, RootStore(1)?.cursor, RootStore(2)?.cursor, RootStore(3)?.cursor, RootStore(4)?.cursor, RootStore(5)?.cursor, RootStore(6)?.cursor, RootStore(7)?.cursor];
                },
            });
        } catch (err) {
            console.log('Peer initialization failed', err);
        }
    };

    const helloBtnOnClick = async () => {
        if (!Fluence.getStatus().isConnected) {
            return;
        }
        console.log('peerIdInput, relayPeerIdInput')
        console.log(vapeerIdInput, varelayPeerIdInput)
        // Using aqua is as easy as calling a javascript funсtion
        const res = await sayHello(vapeerIdInput, varelayPeerIdInput);
        setHelloMessage(res);
    };

    return (
        <div className="App">
            <div className="content">
                {isConnected ? (
                    <>
                        <h1>Connected</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="bold">Peer id:</td>
                                    <td className="mono">
                                        <span id="peerId">{Fluence.getStatus().peerId!}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-clipboard"
                                            onClick={() => copyToClipboard(Fluence.getStatus().peerId!)}
                                        >
                                            <i className="gg-clipboard"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bold">Relay peer id:</td>
                                    <td className="mono">
                                        <span id="relayId">{Fluence.getStatus().relayPeerId}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-clipboard"
                                            onClick={() => copyToClipboard(Fluence.getStatus().relayPeerId!)}
                                        >
                                            <i className="gg-clipboard"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <h2>Say hello!</h2>
                            <p className="p">
                                Now try opening a new tab with the same application. Copy paste the peer id and relay
                                from the second tab and say hello!
                            </p>
                            <div className="row">
                                <label className="label bold">Target peer id</label>
                                <input
                                    id="targetPeerId"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                        setPeerIdInput(e.target.value)
                                        vapeerIdInput = e.target.value
                                    }}
                                    value={peerIdInput}
                                />
                            </div>
                            <div className="row">
                                <label className="label bold">Target relay</label>
                                <input
                                    id="targetRelayId"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                        setRelayPeerIdInput(e.target.value)
                                        varelayPeerIdInput = e.target.value
                                    }}
                                    value={relayPeerIdInput}
                                />
                            </div>
                            <div className="App">
                                  <a style={{cursor: 'pointer', fontSize: '40px'}}onClick={click}>{va[tube]}</a>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <ReactMic
                                      record={record}
                                      className="sound-wave"
                                      onStop={onStop}
                                      strokeColor="#000000"
                                      backgroundColor="#FF4081" />
                                  <br/>
                                  {relayPeerIdInput}
                                  <br/>
                                  <br/>
                                    {audioStack}
                                    {messages}
                                  <br/>
                                  <br/>
                                </div>
                            <div className="row">
                                <button className="btn btn-hello" onClick={helloBtnOnClick}>
                                    say hello
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Intro 1: P2P browser-to-browser</h1>
                        <h2>Pick a relay</h2>
                        <ul>
                            {relayNodes.map((x) => (
                                <li key={x.peerId}>
                                    <span className="mono">{x.peerId}</span>
                                    <button className="btn" onClick={() => connect(x.multiaddr)}>
                                        Connect
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {helloMessage && (
                    <>
                        <h2>Message</h2>
                        <div id="message"> {helloMessage} </div>
                    </>
                )}
            </div>
        </div>
    );
}

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRjMDQ4M2Y1M2UxZDAxQzk4M2U3NTQxRTMzNjhBMEVjMzc1QTc3NDgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjgyNjIxNDkyNzksIm5hbWUiOiJyZWVkIn0.NofDSMbuIq0piTz9koErMeMcNkMIl_W8jFPI_O2um54"
}

function makeFileObjects (obj: any) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

  const files = [
    new File([blob], 'hello.json')
  ]
  return files
}



function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

const va = ['𓂍','⧭']

let hack = 0
// let relayPeerIdInput = ''
// let peerIdInput = ''
// function VaEmit(props: any) {
//   const [tube, setTube] = useState(0)
//   const [horo, setHoro] = useState(false)
//   const [record, setRecord] = useState(false)
//   const [recordState, setRecordState] = useState(false)
//   const [myAudioSrc, setMyAudioSrc] = useState<string[]>([]);
//   const [audioStack, setAudioStack] = useState<any[]>([])
//   const [messages, setMessages] = useState<any[]>([])

//   const click = async () => {
//     console.log(getAccessToken())
//     switch(tube){
//     case 0:
//       start()
//       break;
//     case 1:
//       stop()
//       break;
//     }

//     setTube(current => {
//       return current + 1
//     })

//     if(tube >= 1) {
//       setTube(0)
//       setRecord(false)
//     }
//   }

//   const start = () => {
//     console.log('start')
//     setRecord(true)
//   }

//   const stop = () => {
//     console.log('stop')
//     setRecord(false)
//   }

//   const onStop = async (recordedBlob: any) => {
//     console.log("recordedBlob is: ", recordedBlob);
//     console.log("peerIdInput is: ", props.peerIdInput);
//     console.log("relayPeerIdInput is: ", props.relayPeerIdInput);
//     var url = URL.createObjectURL(recordedBlob.blob);
//     // setMyAudioSrc(url);
//     // console.log(url)
//     setMyAudioSrc(current => [...current, ...[url]])
//     await storeFiles(makeFileObjects(recordedBlob), props.peerIdInput, props.relayPeerIdInput)
//     // await storeFiles(makeFileObjects({test: 'radio'}))
//   };

//   useEffect(() => {
//     const audio = myAudioSrc.map((audioEl) => {
//       return <audio controls id="myAudio" src={audioEl}></audio>
//     })
//     setAudioStack(audio)
//   }, [myAudioSrc])

//   return (
//     <div className="App">
//       <a style={{cursor: 'pointer', fontSize: '40px'}}onClick={click}>{va[tube]}</a>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <ReactMic
//           record={record}
//           className="sound-wave"
//           onStop={onStop}
//           strokeColor="#000000"
//           backgroundColor="#FF4081" />
//       <br/>
//       {props.relayPeerIdInput}
//       <br/>
//       <br/>
//         {audioStack}
//         {messages}
//       <br/>
//       <br/>
//     </div>
//   );
// }

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

function Stake(props){

  const [remote, setRemote] = useState<any>(false)
  const [bars, setBars] = useState<any>(null)
  const [loadedPerogie, setLoadedPerogie] = useState(false)
  const spirit = () => {
    console.log('hey its me')
    props.setRenderer(6)
  }

   // const connect = async (relayPeerId: string) => {
   //      console.log('setting')
   //      console.log(relayPeerId)
   //      // console.log(relayPeerId)
   //      // props.setRelayPeerIdInput(relayPeerId)
   //      // console.log(props.relayPeerId)
   //      // relayPeerIdInput = 
   //      try {
   //          await Fluence.start({ connectTo: relayPeerId });
   //          // setIsConnected(true);
   //          // Register handler for this call in aqua:
   //          // HelloPeer.hello(%init_peer_id%)
   //          registerHelloPeer({
   //              hello: (from) => {
   //                  setHelloMessage('Hello from: \n' + from);
   //                  return 'Hello back to you, \n' + cd;
   //              },
   //          });
   //      } catch (err) {
   //          console.log('Peer initialization failed', err);
   //      }
   //  };

  const connect = async () => {

    console.log(Fluence.getStatus().peerId)
    console.log(await KeyPair.fromEd25519SK((await Vault(true))!))
    console.log(await Fluence.start({ connectTo: relayNode, KeyPair: await KeyPair.fromEd25519SK((await Vault(true))!)}).catch((e) => console.log(e)))
    console.log(Fluence.getStatus().peerId)
    registerHelloPeer({
        hello: (from) => {
            console.log('running a hello peer particle')
            // setHelloMessage('Hello from: \n' + from);
            // return 'Hello back to you, \n';
            // TODO: which one
            // console.log(remote)
            return "" + [RootStore(0)?.cursor, RootStore(1)?.cursor, RootStore(2)?.cursor, RootStore(3)?.cursor, RootStore(4)?.cursor, RootStore(5)?.cursor, RootStore(6)?.cursor, RootStore(7)?.cursor];

            // return 'Hello back to you, \n' + [Apple((new Light()).past()), Apple((new Light()).present()), Apple((new Light()).past())];
        },
    });
  }

  // try {
  //           await Fluence.start({ connectTo: relayPeerId });
  //           setIsConnected(true);
  //           // Register handler for this call in aqua:
  //           // HelloPeer.hello(%init_peer_id%)
  //           // registerHelloPeer({
  //           //     hello: (from) => {
  //           //         setHelloMessage('Hello from: \n' + from);
  //           //         return 'Hello back to you, \n' + cd;
  //           //     },
  //           // });
  //       } catch (err) {
  //           console.log('Peer initialization failed', err);
  //       }

  useEffect(() => {
    console.log(Vault(true))

    


    if(!loadedPerogie){

      console.log('doing bars')
      console.log((new Light()).past())
      console.log((new Light()).present())
      console.log((new Light()).future())
      // console.log(RootStore().present())
      // console.log(RootStore().future())
    // cycle through open positions
    const positions = [
      {
        // amount: 22,
        cycle: 'past'
      },{
        // amount: 40,
        cycle: 'present'
      },{
        // amount: 50,
        cycle: 'future'
      }
    ]
    // add bars to list
    const barCycles = positions.map((el, index) => {
      const color = el.cycle == 'past' ? 'cyan' : (el.cycle == 'present' ? 'red' : 'lime')
      console.log(color)
      const bar = new Bar(index, el.cycle, color)
      return bar.open()
    })
    console.log(barCycles)
    // add list to html
    setBars(barCycles)
    setTimeout(() => {
    positions.map((el, index) => {
      switch(index){
        case 3:
          Bar.accelerate(index, Apple((new Light()).past(), 'PAST'))
        break;
        case 1:
          Bar.accelerate(index, Apple((new Light()).present(), 'PRESENT'))
        break;
        case 2:
          Bar.accelerate(index, Apple((new Light()).future(), 'FUTURE'))
        break;
      }
    //     // return bar.open()
      })
    },100)
      setLoadedPerogie(true)
    }

  }, [bars])

  const clearSharedCards = () => {
    for(let i = 0; i < 8; i++){
      localStorage.removeItem(`share:cards${i}`);
    }
    setRemote(false)
  }

  const pull = async (peerId) => {
    console.log(peerId)
    console.log(await lir(Vault(true)))
    // console.log(relayNode)
    // TODO: solve which fluence peer is connected
    console.log(Fluence.getStatus().peerId)
    console.log(String(Fluence.getStatus().relayPeerId))
    console.log('peerIdInput, relayPeerIdInput')
    console.log(peerId, relayNode.multiaddr.split('/p2p/')[1])
    console.log(vapeerIdInput, varelayPeerIdInput)
    // console.log(relayNode.multiaddr.split('/p2p/')[1])
    const res = await sayHello(peerId, relayNode.multiaddr.split('/p2p/')[1]);
    // const res = await sayHello(vapeerIdInput, varelayPeerIdInput);


    // const res = await sayHello("12D3KooWQ3ZkPVCkFpRHdxtA4s4Azy7YcdF8gxPvbmSRTvipYBwh", String(Fluence.getStatus().relayPeerId));
    // const res = await sayHello(peerId, String(Fluence.getStatus().relayPeerId));
    console.log(res.split(',').forEach((el,i) => {
      localStorage.setItem(`share:cards${i}`, el)
    }))

    // remote = true
    setRemote(true)
  }

  return(
    <>
      <h1 className="title">stake</h1>

      {
        remote ? (<>
          <div className="gallery">
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(1 * 45deg)) translateZ(380px)` }}>
                  <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(0) ? ShareStore(0) : stringCard} alt="" />    
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(2 * 45deg)) translateZ(380px)` }}>
                  <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(1) ? ShareStore(1) : stringCard} alt="" />    
                </span>
                <span style={{ width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(3 * 45deg)) translateZ(380px)` }}>
                  <img style={{ width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(2) ? ShareStore(2) : stringCard } alt="" />    
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(4 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(3) ? ShareStore(3) : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(5 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(4) ? ShareStore(4) : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(6 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(5) ? ShareStore(5) : stringCard } alt="" />
                </span>
                    <span style={{width: cardStorage[0] ? '100%' : "200% !important"  ,transform:  `rotateY(calc(7 * 45deg)) translateZ(380px)` }}>
                <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(6) ? ShareStore(6) : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(8 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={ShareStore(7) ? ShareStore(7) : stringCard} alt="" />
                </span>
            </div>
          </>):
        // TODO: abstract this out to a Component
        <div className="gallery">
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(1 * 45deg)) translateZ(380px)` }}>
                  <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(0) ? RootStore(0)?.cursor : stringCard} alt="" />    
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(2 * 45deg)) translateZ(380px)` }}>
                  <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(1) ? RootStore(1)?.cursor : stringCard} alt="" />    
                </span>
                <span style={{ width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(3 * 45deg)) translateZ(380px)` }}>
                  <img style={{ width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(2) ? RootStore(2)?.cursor : stringCard } alt="" />    
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(4 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(3) ? RootStore(3)?.cursor : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(5 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(4) ? RootStore(4)?.cursor : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(6 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(5) ? RootStore(5)?.cursor : stringCard } alt="" />
                </span>
                    <span style={{width: cardStorage[0] ? '100%' : "200% !important"  ,transform:  `rotateY(calc(7 * 45deg)) translateZ(380px)` }}>
                <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(6) ? RootStore(6)?.cursor : stringCard } alt="" />
                </span>
                <span style={{width: cardStorage[0] ? '100%' : "200% !important" , transform:  `rotateY(calc(8 * 45deg)) translateZ(380px)` }}>
                    <img style={{width: cardStorage[0] ? '100%' : "200% !important" }} src={RootStore(7) ? RootStore(7)?.cursor : stringCard} alt="" />
                </span>
            </div>
      }
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="container">
        <div className="vertical-center">
          <div className="btn btn__secondary" onClick={()=> props.setRenderer(1)}><p>b e g i n a g a i n</p></div>
        </div>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
      <div className="container">
        <div className="vertical-center">
          <div className="btn btn__secondary" onClick={()=> props.setRenderer(6)}><p>e m a i l l i g h t</p></div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="container">
        <div className="vertical-center">
          <div className="btn btn__secondary" onClick={()=> props.setRenderer(7)}><p>s h a r e</p></div>
        </div>
      </div>
      <br/>
      <br/>
      <div className="container3">
          <header>
              <h1 className="title"style={{color: 'grey'}}>Arcana Light</h1>
          </header>
          <section>
              <article>
              {bars}
              </article>
          </section>
      </div> 
      <br/>
      <br/>
      <p>contact ~milbyt-moszod on urbit as a trusted Oracle for interpretation</p>
      <br/>
      <br/>
      <p onClick={async () => await connect()}>connect</p>
      <br/>
      <p onClick={() => pull(localStorage.getItem(`share:0`))}>{localStorage.getItem(`share:0`)}</p>
      <br/>
      <p onClick={() => pull(localStorage.getItem(`share:1`))}>{localStorage.getItem(`share:1`)}</p>
      <br/>
      <p onClick={() => pull(localStorage.getItem(`share:2`))}>{localStorage.getItem(`share:2`)}</p>
      <br/>
      <br/>
      <br/>
      {/* todo: in time <Audio/>*/}
      <div className="container">
        <div className="vertical-center">
          <div className="btn btn__secondary" onClick={()=> {
            clearSharedCards()
          }}><p>c l e a r</p></div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <Banner/>
    </>
  )
}

function Setting(props) {

  const [tarotDeck, setTarotDeck] = useState<any>(null)
  const [advance, setAdvance] = useState<any>(null)
  // const [deck, setDeck] = useState<any>(null)
  const [description, setDescription] = useState<any>(null)

  useEffect(() => {
    const deckNames = ['https://www.trustedtarot.com/img/cards/the-magician.png','https://i.ibb.co/cydgvf3/Screen-Shot-2022-11-12-at-11-00-05-AM.png']

    const decks = deckNames.map((img, i) => {
      return <div onClick={() => {
                  props.setDeck(i)
                  // deck = i
                  console.log(props.deck)
                  setDescription(i == 0 ? 'Rider Waite' : 'n3pthora')
                  }} className={
                    (props.deck == i && props.deck != null)
                    ? 
                      'active-deck' 
                    : 
                      'deck-line-up' 
                    }>
                <img  style={{width: '40%', margin: '20px', cursor: 'pointer'}} src={img} alt="Deck"/>
             </div>
    })

    setTarotDeck(decks)
  }, [props.deck])

  const pullFlu = async () => {
    console.log('TTL')
    const relayTime = await getRelayTime(props.relayNode);
    console.log(relayTime)
    const getRandom = Math.floor([...Array(relayTime % 78).keys() as any].reduce((x,y) => x + Math.abs(Math.tan(y)))%78)
    console.log(getRandom)
  }

  // const onSelect = (deck, pullState) => {
  //   // console.log(card)
  //   console.log(pullState)
  //   if(deck.value == 'Rider Waite') {
  //     setTarotDeck('https://www.trustedtarot.com/img/cards/the-magician.png')
  //   } else {
  //     setTarotDeck('https://i.ibb.co/cydgvf3/Screen-Shot-2022-11-12-at-11-00-05-AM.png')
  //   }
  //   setAdvance(<div className="container">
  //           <div className="vertical-center">
  //             <div className="btn btn__secondary" onClick={()=> pullCards()}><a><p>p u l l c a r d s</p></a></div>
  //           </div>
  //         </div>)
  //   // setPull(pullState, card)
  // }

  const pullCards = () => {
    console.log('pulling')
    props.setRenderer(3)
  }

  return(
    <>
      <h1 className="title">Setting Intention</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <br/>
      <br/>
      <br/>
      <div className="container">
            <div className="vertical-center">
            <div style={{width: '100%', display: 'table'}}>
    <div style={{display: 'table-row'}}>
                {tarotDeck}
    </div>
    </div>
            </div>
      </div>
        <FadeIn>
        <br/>
        <br/>

{/*        <div className='border'>
          <input placeholder='deck search' type='text'/>
        </div>*/}
        {advance}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1>
          {
            description
          }
        </h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


          {deck != null ? <div className="container">
            <div className="vertical-center">
              <div className="btn btn__secondary" onClick={()=> pullCards()}><p>n e x t</p></div>
            </div>
          </div> : null }
        <br/>
        <br/>
        <br/>
        </FadeIn>
        {/*TODO: banner with clock aligned with wheel and 9/6*/}
        <Banner/>
    </>
  )
}

function Dex(props){
  
  const { address, isConnected } = useAccount()
  
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {

      const connectToSpirit = async (cb) => {
        await connect()
        // const data = await fetch('https://yourapi.com');
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(address)
        const addressStatic = '0xc48835421ce2651BC5F78Ee59D1e10244753c7FC'
        console.log(await provider.lookupAddress(address as any))
        const ens = await provider.lookupAddress(address as any)
        if(ens){
          cb(ens)
        }else {
          cb('...eth')
        }
      }

      connectToSpirit((ens) => {
        console.log(ens)
        props.setENS(ens)
      })
    // return []
  }, [address, isConnected])

  const web3Connect = async () => {
    await connect()
    // setInterval(async () => {
    //   if(isConnected){
    //       const provider = new ethers.providers.Web3Provider(window.ethereum)
    //       console.log(address)
    //       console.log(await provider.lookupAddress(address as any))
    //   }else {
    //     console.log(`isConnected: ${isConnected}`)
    //   }
    // }, 0)
  }

  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={async () => await web3Connect()}>Connect Wallet</button>
}

let test = 0
const Deposit = (props) => {
  const [aura, setAura] = useState('')
  const [matterDirect, setMatterDirect] = useState('')
  const deposit = () => {
    console.log(apWineStateChange)
    props.setRouter(++apWineStateChange)
  }
  const alter = () => {
    const altsOnOneAddress = ['moskalyk.ens', '~milbyt-moszod', 'Matter.direct given Spirit']
    console.log(altsOnOneAddress[test])
    setAura(altsOnOneAddress[test])
    test++
    if(test == 3) test = 0
  }
  return(
    <>
      <p>deposit :: $</p>
      <br/>
      <br/>
      <div onClick={alter}>
        <h1 style={{color: 'black', cursor: 'pointer'}}> 𓏬 </h1>
      </div>
      <br/>
      {aura}
      {matterDirect}
      <br/>
      <br/>
      <Dex setENS={setMatterDirect}/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <button style={{background: 'black'}}id="btn" className="btn" onClick={() => deposit()}>
            ⧫
        </button>
      </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <button id="btn" className="btn" onClick={() => deposit()}>
            🟆
        </button>
      </div>
    </div>
    </>
  )
}

const Redeem = (props) => {
  const redeem = () => {
    console.log(apWineStateChange)
    props.setRouter(++apWineStateChange)
  }
  return(
    <>
      <p>redeem :: $</p>
      <br/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <button id="btn" className="btn" onClick={() => redeem()}>
            🟆
        </button>
      </div>
    </div>
    </>
  )
}

const Swap = (props) => {
  return(
    <>
      <p>swap :: $</p>
      <br/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <button id="btn" className="btn" onClick={() => {
          props.setRenderer(5)
          apWineStateChange = 1
        }}>
            🟆
        </button>
      </div>
    </div>
    </>
  )
}

const Apwine = (router, setRouter, setRenderer) => {
  let cup;
  switch(router){
    case 1:
      cup = <Deposit setRouter={setRouter} />
      break
    case 2:
      cup = <Redeem setRouter={setRouter}/>
      break;
    case 3:
      cup = <Swap setRenderer={setRenderer}/>
      break;
    default:
      cup = <p> 403 </p>
      break;
  }
  return cup
}

let apWine = 1
let apWineStateChange = 1
function Liquiduty(props){
  const [halt, setHalt] = useState(false)
  const [router, setRouter] = useState(1)
  const [deposit, setDeposit] = useState('')
  const [redeem, setRedeem] = useState('')
  const [swap, setSwap] = useState('')

  useEffect(() => {
    if(!halt) {
      setInterval(() => {
        if(apWine == 1){
            setDeposit('is-active')
            setRedeem('')
            setSwap('')

          }else if(apWine == 2){
            setDeposit('is-active')
            setRedeem('is-active')
            setSwap('')
          } else if(apWine == 3){
            setDeposit('is-active')
            setRedeem('is-active')
            setSwap('is-active')
            apWine = 0;
          }
          apWine++
      }, 1000)
    }
      setHalt(true)
  })
  return( 
    <>
      <h1 className="title">Liquiduty</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <section>
      <h2>Apwine</h2>
      <ol className="progress-bar">
        <li style={{textAlign: 'left'}} className={deposit}><span>Deposit</span></li>  
        <li className={redeem}><span>Redeem</span></li>  
        <li className={swap}><span>Swap</span></li>
      </ol>
    </section>

    <br/>
    <br/>
    {
      Apwine(router, setRouter, props.setRenderer)
    }
    <br/>
    <br/>
    <Banner />
    </>
  )
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// pulling REVERSED_NINE_OF_SWORDS on this one
const spindle = (card) => {
  if(card == undefined) return "X"
  console.log(card)
  const modifiedCard = card.split(' ')
  console.log(modifiedCard)
  let numeric;

  if(modifiedCard[1]){

    const cardStaked = n3pthora.filter((el,i) => {
      console.log(el)
      console.log(card)
      if(card == el[1]) numeric = i
      return card == el[1]
    })
    console.log(cardStaked)
  }else {
    const cardStaked = tarot.filter((el,i) => {
      console.log(el)
      console.log(modifiedCard[0])
      if(modifiedCard[0] == el) numeric = i
      return modifiedCard[0] == el[1]
    })
    console.log(cardStaked)
  }

  return numeric
}

function birch(cursor){
  if(cursor == undefined) return "https://i.ibb.co/BVdYPHL/stack8-dc7e14e434440a989dd6.png"
  else return cursor
}
const library = {
      0: '🃟',
      1: '⚚',
      2: '♕',
      3: '⚘',
      4: '♖',
      5: '♔',
      6: '☂',
      7: '♘',
      8: '☮',
      9: '☯',
      10: '☸',
      11: '⚖',
      12: '♱',
      13: '☠',
      14: '♻',
      15: '☢',
      16: '☖',
      17: '★',
      18: '☽',
      19: '☼',
      20: '⚱',
      21: '⚬',
      22: '∅',
      23: 'RED',
      24: 'ORANGE',
      25: 'YELLOW',
      26: 'GREEN',
      27: 'BLUE',
      28: 'INDIGO',
      29: 'VIOLET',
      30: '∞',
      31: '☉',
      32: '☿',
      33: '♀',
      34: '♁',
      35: '♂',
      36: '♃',
      37: '♄',
      38: '♅',
      39: '♆',
      40: '♇',
      41: '⚀',
      42: 'Birch 𐂷 BEITH',
      43: 'Rowan 𐂷 LUIS',
      44: 'Alder 𐂷 FEARN',
      45: 'Willow 𐂷 SAILLE',
      46: 'Ash 𐂷 NUIN',
      47: 'Hawthon 𐂷 HUATHE',
      48: 'Oak 𐂷 DUIR',
      49: 'Holly 𐂷 TINNE',
      50: 'Hazel 𐂷 COLL',
      51: 'Apple 𐂷 QUERT',
      52: 'Vine 𐂷 MUIN',
      53: 'Ivy 𐂷 GORT',
      54: 'Reed 𐂷 NGETAL',
      55: 'Blackthorn 𐂷 STRAIF',
      56: 'Elder 𐂷 RUIS',
      57: 'Silver Fir 𐂷 AILIM',
      58: 'Furze 𐂷 OHN',
      59: 'Heather 𐂷 UR',
      60: 'Poplar 𐂷 EADHA',
      61: 'Yew 𐂷 IOHO',
      62: 'The Grove 𐂷 KOAD',
      63: 'Spindle 𐂷 OIR',
      64: 'Honeysuckle 𐂷 UNILEAND',
      65: 'Beech 𐂷 PHAGOS',
      66: 'The Sea 𐂷 MOR',
      67: '⚁',
      68: 'The Self ᛗ MANNAZ',
      69: 'Partnership ᚷ GEBO',
      70: 'Signals ᚫ ANSUZ',
      71: 'Seperation  OTHILA',
      72: 'Strength  URUZ',
      73: 'Initiatian PERTH',
      74: 'Constraint  NAUTHIZ',
      75: 'Fertility  INGUZ',
      76: 'Defense  EIHWAZ',
      77: 'Protection ᛉ ALGIZ',
      78: 'Posessions  FEHU',
      79: 'Joy  WUNJO',
      80: 'Harvest  JERA',
      81: 'Opening  KANO',
      82: 'Warrior  TEIWAZ',
      83: 'Growth  BERKANA',
      84: 'Movement  EHWAZ',
      85: 'Flow  LAGUZ',
      86: 'Disruption  HAGALAZ',
      87: 'Journey ᚱ RAIDO',
      88: 'Gateway  THURISAZ',
      89: 'Breakthrough  DAGAZ',
      90: 'Standstill  ISA',
      91: 'Wholeness  SOWELU',
      92: 'Unknowable  ODIN',
      93: '⚂',
      94: '🜁',
      95: '🜂',
      96: '🜃',
      97: '🜄',
      98: '⚃',
      99: '',
      100: '',
      101: '',
      102: '',
      103: '',
      104: '',
      105: '',
      106: '',
      107: '',
      108: '',
      109: '',
      110: '',
      111: '',
      112: '',
      113: '',
      114: '',
      115: '',
      116: '',
      117: '',
      118: '',
      119: '',
      120: '',
      121: '',
      122: '',
      123: '',
      124: '',
      125: '',
      126: '',
      127: '',
      128: '',
      129: '',
      130: '',
      131: '',
      132: '',
      133: '',
      134: '',
      135: '',
      136: '',
      137: '',
      138: '',
      139: '',
      140: '',
      141: '',
      142: '',
      143: '',
      144: '',
      145: '',
      146: '',
      147: '',
      148: '',
      149: '',
      150: '',
      151: '',
      152: '',
      153: '',
      154: '',
      155: '',
      156: '',
      157: '',
      158: '',
      159: '',
      160: '',
      161: '',
      162: '',
      163: '',
      164: '',
      165: '',
      166: '',
      167: '',
      168: '',
      169: '',
      170: '',
      171: '',
      172: '',
      173: '',
      174: '',
      175: '',
      176: '',
      177: '',
      178: '',
      179: '',
      180: '',
      181: '',
      182: '',
      183: '',
      184: '',
      185: '',
      186: '',
      187: '',
      188: 'RED_JASPER',
      189: '',
      190: '',
      191: '',
      192: '',
      193: '',
      194: '',
      195: '',
      196: '',
      197: '',
      198: '',
      199: '',
      200: '',
      201: '',
      202: '',
      203: '',
      204: '',
      205: '',
      206: '',
      207: '',
      208: '',
      209: '',

      210: '☌',
      211: '⚯',
      212: '□',
      213: '♈︎',
      214: '☌',
      215: '⚯',
      216: '□',

      217: '',
      218: '',
      219: '',
      220: '',
      221: '',
      222: '',
      223: 'SUNDAY',
      224: 'MONDAY',
      225: 'TUESDAY',
      226: 'WEDNESDAY',
      227: 'THURSDAY',
      228: 'FRIDAY',
      229: 'SATURDAY',
      230: 'WOLF',
      231: 'CAT',
      232: 'ROOSTER',
      233: 'COW',
      234: 'BUFFALO',
      235: 'SPIDER',
      236: 'HORSE',
      237: 'SNAKE',
      238: 'FISH',
      239: 'FOX',
      240: 'BAT',
      241: 'MONKEY',
      242: 'TURTLE',
      243: 'BIRD',
      244: 'GOAT',
      245: 'MALKUTH',
      246: 'YESOD',
      247: 'HOD',
      248: 'NETZACH',
      249: 'TIPARETH',
      250: 'GEBURH',
      251: 'CHESED',
      252: 'DAATH',
      253: 'BINAH',
      254: 'CHOKMAH',
      255: 'KETER'
    }


async function lir(peerIdPromise){
  console.log(await peerIdPromise)
  // const peerId = (await peerIdPromise).Libp2pPeerId.toB58String()
  const seedArray = (await peerIdPromise)
  // if(typeof peerId == KeyPair) {
  //   // peerId = peerId.
  // }
  console.log(seedArray)
  await Fluence.start({
    connectTo: relayNode,
    KeyPair: await KeyPair.fromEd25519SK(seedArray)
  })

  const peerId = Fluence.getStatus().peerId
  console.log('peerId')
  console.log(peerId)

  let spirit: any = []
  if(peerId){
    const rad = 13
    let total = 0
    // console.log(String(peerId).length)
    for(let i = 0; i < peerId.length + 1; i++) {
      if(i % rad || i == 0) {
        // console.log(peerId.charCodeAt(i))
        total += peerId.charCodeAt(i)
      } else {
        // console.log(i)
        // console.log(total)
        // console.log(library[total % 256])
        spirit.push(library[total % 256])
        total = 0
      }
    }
  }
  return `${spirit[0]}-${spirit[1]}-${spirit[2]}-${spirit[3]}`
}

async function Vault(fromStore = false) {
  const keyString = localStorage.getItem('⚂')
  console.log(keyString)
  console.log(keyString == null)
  console.log(!fromStore)

  if(keyString == null || !fromStore) {
    const keyString = (await KeyPair.randomEd25519()).toEd25519PrivateKey()
    localStorage.setItem('⚂', String(keyString))
    return keyString
  } else if(fromStore) {
    console.log(keyString)
    return new Uint8Array(keyString.split(',').map((num) => Number(num)))

  }
  // else return await KeyPair.fromEd25519SK(new Uint8Array(keyString.split(',').map((num) => Number(num))))
}

function Share(props){
  const [spirit, setSpirit] = useState<any>()
  const [peerId, setPeerId] = useState<any>()
  const addPeer = () => {
    console.log('coffee')
    setPeerId(window.location.href.split('/#/')[1])
    // add to storage
    setPeerId(window.location.href.split('/#/')[1])
    const nonceShare = localStorage.getItem('share')
    if(nonceShare == null){
      localStorage.setItem('share', String(0))
    }
    localStorage.setItem(`share:${Number(localStorage.getItem('share')) % 8}`, window.location.href.split('/#/')[1])
    localStorage.setItem('share', String(Number(localStorage.getItem('share'))+1))
    props.setRenderer(5)
  }

  return(
    <>
      <br/>
      <br/>
      <h1 className="title">add peer</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      {peerId}
      {spirit}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <div className="btn btn__secondary" style={{fontSize: '50px'}} onClick={()=> addPeer()}><p>A D D</p></div>
          {/*{Fluence.getStatus().isConnected ? '🟆' : 'ON'}*/}
      </div>
      </div>
    </>
  )
}

function Phone(props){
  const [phone, setPhone] = useState<any>();
  const [consent, setConsent] = useState<any>();
  const [phoneSuccess, setPhoneSuccess] = useState<any>();
  const [spirit, setSpirit] = useState<any>('');

  useEffect( () => {
    Fluence.start({ connectTo: relayNode })
      .catch((err) => console.log("Client initialization failed", err));
      console.log(Fluence.getStatus().peerId)
  })
  const phoneText = async () => {
    // write to local storage

    // console.log(keypair)
    // console.log((await KeyPair.randomEd25519()).Libp2pPeerId.privKey)
    // const keyString = String((await KeyPair.randomEd25519()).toEd25519PrivateKey())
    // // console.log((await KeyPair.randomEd25519())._privKey._key)
    // await Fluence.start({
    //   connectTo: relayNode,
    //   KeyPair: await KeyPair.fromEd25519SK(new Uint8Array(keyString.split(',').map((num) => Number(num))))
    // })
    const peerId = Fluence.getStatus().peerId
    console.log(peerId)
    // console.log(keyString)
    console.log(await Vault(true))
    console.log(await lir(Vault(true)))
    // const keypair = new KeyPair(peerId as any)
    // console.log(keypair.toEd25519PrivateKey())

    // localStorage.setItem('⚀', keyString)
    localStorage.setItem('⚂', String(await Vault(true)))


    let postBody = {
      phone: phone,
      spirit: await lir(Vault(true)),
      consent: consent,
      peerId: peerId
    }

    const res = postData('http://localhost:3001/index/sms', postBody)
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      setPhoneSuccess(true)
    });

  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    if(event.target.value == 'on') setConsent(true)
    // setConsent(event.target.value);
  };

  return(
    <>
      <br/>
      <br/>
      <p>share spirit</p>
      <br/>
      {/*{lir(Fluence.getStatus().peerId! ? Fluence.getStatus().peerId! : "12D3KooWR4cv1a8tv7pps4HH6wePNaK6gf1Hww5wcCMzeWxyNw51")}*/}
      {/*{lir(Fluence.getStatus().peerId! ? Fluence.getStatus().peerId! : "12D3KooWDaWxv4tMD6DtBBenE6jNUL6mNtM2zsHKZgfVcEhGwgyB")}*/}
      {spirit}
      <br/>
      <br/>
      <input className="radio__1" type="radio" id="html" name="fav_language" onChange={radioHandler}/>
      <br/>
      <br/>
      <br/>
        { phoneSuccess ? <p>text should be on it's way</p> : <input className="input" onChange={async (e) => {
          setPhone(e.target.value)
          setSpirit(await lir(Vault(true)))
        // console.log(emailField)
          }} placeholder="#phone"></input>
        }
      <br/>
      <br/>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <div className="btn btn__secondary" style={{fontSize: '50px'}} onClick={()=> phoneText()}><p>T E X T</p></div>
          {/*{Fluence.getStatus().isConnected ? '🟆' : 'ON'}*/}
      </div>
      </div>
    </>
  )
}

function Email(props){
  const [emailField, setEmailField] = useState('')
  const [consent, setConsent] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const email = () => {
    console.log('Emailing')

    // get from email onput
    const postBody = {
      email: emailField,
      one: `${spindle(RootStore(0)?.cursor)}_${new Date(Number(RootStore(0)?.time))}`,
      oneEmail: `${birch(RootStore(0)?.cursor)}`,
      two: `${spindle(RootStore(1)?.cursor)}_${new Date(Number(RootStore(1)?.time))}`,
      twoEmail: `${birch(RootStore(1)?.cursor)}`,
      three: `${spindle(RootStore(2)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      threeEmail: `${birch(RootStore(2)?.cursor)}`,
      four: `${spindle(RootStore(3)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      fourEmail: `${birch(RootStore(3)?.cursor)}` ,
      five: `${spindle(RootStore(4)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      fiveEmail: `${birch(RootStore(4)?.cursor)}` ,
      six: `${spindle(RootStore(5)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      sixEmail: `${birch(RootStore(5)?.cursor)}` ,
      seven: `${spindle(RootStore(6)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      sevenEmail: `${birch(RootStore(6)?.cursor)}` ,
      eight: `${spindle(RootStore(7)?.cursor)}_${new Date(Number(RootStore(2)?.time))}`,
      eightEmail: `${birch(RootStore(7)?.cursor)}` ,
      consent: consent
    }

    const res = postData('http://localhost:3001/index/', postBody)
    // const res = postData('https://reed.live/index/', postBody)
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      setEmailSuccess(true)
    });

    // const res = fetch('localhost:3001/index', {

    // })

    console.log(res)
  }

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    if(event.target.value == 'on') setConsent(true)
    // setConsent(event.target.value);
  };



  useEffect(() => {
    // const el = document.getElementsByName("fav_language")
    // console.log(el)


    // el[0].addEventListener('click', function() {
    //   // let result = document.getElementById('html')
    //   let radio = (document.querySelector('[name="fav_language') as HTMLInputElement).value
    //   // let radio = <HTMLInputElement>document?.querySelector('[name="fav_language"]:checked')
    //   console.log(radio)
    //   let xo = true as any

    //   if((document.querySelector('[name="fav_language') as HTMLInputElement).value){
    //     console.log('xo')
    //     console.log(xo)
    //     xo = false
    //   }

    //   (document.querySelector('[name="fav_language') as HTMLInputElement).checked = xo
    //   // let value = document?.querySelector('[name="fav_language"]:checked')?.value
    //   // console.log('value')
    //   // console.log(value)
    //   // setConsent(value)
    // })
  })

  return(
    <>
      <h1 className="title">Email</h1>
      <br/>
      <div className="container">
      <div className="vertical-center">
        <div className="btn btn__secondary" onClick={()=> email()}><p>e m a i l</p></div>
          {/*{Fluence.getStatus().isConnected ? '🟆' : 'ON'}*/}
      </div>
      </div>
      <br/>
      <br/>
      <br/>
      <p>consent to recieve a 12 day whl dial for the upcoming cycle?</p> 
      <p><a href="https://github.com/livepeer/Grant-Program/issues/69" target="_blank"> ☂ note</a>: refresh & pass through, to deselect</p>
      <br/>
      <input className="radio__1" type="radio" id="html" name="fav_language" onChange={radioHandler}/>
      <br/>
      <br/>
      <br/>
      <br/>
       { emailSuccess ? <p>email should be on it's way</p> : <input className="input" onChange={(e) => {
        setEmailField(e.target.value)
        console.log(emailField)
          }} placeholder="@email"></input>
        }
    </>
  )
}

// Thanks
const Compass = (props, setRenderer, deck, setDeck, relayNode, setAssembled, assembled) => {
  let needle;
  // like a quilt
  switch(props){
    case 1:
      needle = <Reed setRenderer={setRenderer} setAssembled={setAssembled}/>
      break;
    case 2:
      needle = <Setting setRenderer={setRenderer} deck={deck} setDeck={setDeck}/>
      break;
    case 3:
      needle = <Spread setRenderer={setRenderer} deck={deck} relayNode={relayNode} assembled={assembled} setAssembled={setAssembled}/>
      break;
    case 4:
      needle = <Liquiduty setRenderer={setRenderer} />
      break;
    case 5:
      needle = <Stake setRenderer={setRenderer}/>
      break;
    case 6:
      needle = <Email setRenderer={setRenderer}/>
    //   needle = <Spirit setRenderer={setRenderer}/>
      break;
    case 7:
      needle = <Phone setRenderer={setRenderer}/>
    //   needle = <Spirit setRenderer={setRenderer}/>
      break;
    case 8:
      needle = <Share setRenderer={setRenderer}/>
      break;
    default:
      needle = <h4>404</h4>
  }

  return needle
}

function App() {
  const [assembled, setAssembled] = useState<any>(false)
  const [halt, setHalt] = useState(false)
  const [deck, setDeck] = useState(null)
  const [renderer, setRenderer] = useState(5)
  const [intervaling, setIntervaling] = useState(null)
  const [relayTime, setRelayTime] = useState<Date | null>(null);
  const [fluenceMod, setFluenceMod] = useState<any>(null);
  // const [fluenceMod, setFluenceMod] = useState<any>(null);



  useEffect(() => {
    const url = window.location.href
    console.log(url.split('/#/')[1])
    const nonceShare = localStorage.getItem('share')
    if(nonceShare == null){
      localStorage.setItem('share', String(0))
    }
    const peerId = url.split('/#/')[1]
    if(peerId){
      setRenderer(8)
    }
    // const rootStore = new ShareStore(peerId, localStorage.getItem('share'))
    // rootStore ? rootStore.share(url.split('/#/')[1], localStorage.getItem('share')) : null

    const nonce = localStorage.getItem('nonce')
    if(nonce == null){
      localStorage.setItem('nonce', String(0))
    }
    Fluence.start({ connectTo: relayNode })
      .catch((err) => console.log("Client initialization failed", err));
  }, []);

  const onGetRelayTimeBtnClick = async () => {
    if (!Fluence.getStatus().isConnected) {
      Fluence.start({ connectTo: relayNode }).catch((err) => console.log("Client initialization failed", err));
      return;
    }



    const time = await getRelayTime(relayNode.peerId);
    setRelayTime(new Date(time));
    if(Fluence.getStatus().isConnected){
      await Off()
    }
  };

  const Off = async () => {
    await Fluence.stop()
  }

  return (
    <div className="App">
      <div className="content">
        <h1>P 2 P: <span id="status">{Fluence.getStatus().isConnected ? '🟢' : '🔴'}</span></h1>
        <button style={{marginLeft: "14px"}} id="btn" className="btn" onClick={onGetRelayTimeBtnClick}>
          {Fluence.getStatus().isConnected ? '🟆' : 'ON'}
        </button>
        {relayTime && (
          <>
            <h2>Relay time:</h2>
            <div id="relayTime">{relayTime?.toLocaleString() || ""}</div>
          </>
        )}
      </div>
      {
        Compass(renderer, setRenderer, deck, setDeck, relayNode, setAssembled, assembled)
      }
    </div>
  );
}

export default App;