import React, {useState} from "react";
import "./Calculator.css";
import { Card, Navbar, Container } from "react-bootstrap";
import { API_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { update } from '../../features/userSlice';

function Calculator(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginTime_id, username, loginTime } = useSelector(state => state.user)

    const [value, setValue] = useState("")
    const [operator, setOperator] = useState('')
    const [prevNumber, setPrevNumber] = useState('')
    const [pembilang, setPembilang] = useState('')
    const [hidePembilang, setHidePembilang] = useState(true)

    function handleClick(x){
        setValue(value + x.target.value)
    };
    function deleteClick(){
        setValue('')
    };

    function clearAll(){
        setValue('')
        setPrevNumber('')
        setOperator('')
    }
    function operatorClick(x){
        if(value !== ''){
            if(prevNumber !==''){
                switch (operator){
                    case "sum":
                        setPrevNumber(parseInt(prevNumber)+parseInt(value));
                        break
                    case "min":
                        setPrevNumber(parseInt(prevNumber)-parseInt(value));
                        break
                    case "multiple":
                        setPrevNumber(parseInt(prevNumber)*parseInt(value));
                        break
                    case "divide":
                        setPrevNumber(parseInt(prevNumber)/parseInt(value));
                        break
                    default:
                        break
                }
                setOperator(x.target.value);
            } else {
                setOperator(x.target.value)
                setPrevNumber(value)
            }
            setValue('')
        }else{
            setOperator(x.target.value)
        }
    }

    function calculate(){
        if(operator !== ''){
            switch (operator){
                case "sum":
                    setPrevNumber(parseInt(prevNumber)+parseInt(value));
                    break
                case "min":
                    setPrevNumber(parseInt(prevNumber)-parseInt(value));
                    break
                case "multiple":
                    setPrevNumber(parseInt(prevNumber)*parseInt(value));
                    break
                case "divide":
                    setPrevNumber(parseInt(prevNumber)/parseInt(value));
                    break
                default:
                    break
            }
        } else {
            setPrevNumber(value)
        }
        setValue('')
        setOperator('')
    }

    function createPembilang(n){
        let number = Math.abs(n)
        let hasilBagi = 0
        let temp = ""
        const angka = ["Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"]
        
        if (number < 12) {
            temp = " "+angka[number];
        }
        else if (number <20) {
            temp = createPembilang(number - 10) + " Belas";
        }
        else if (number < 100) {
            hasilBagi = Math.floor(number/10);
            temp = createPembilang(hasilBagi)+" Puluh"+ createPembilang(number % 10);
        }
        else if (number < 200) {
            temp = " Seratus" + createPembilang(number - 100);
        }
        else if (number < 1000) {
            hasilBagi = Math.floor(number/100);
            temp = createPembilang(hasilBagi) + " Ratus" + createPembilang(number % 100);
        }
         else if (number < 2000) {
            temp = " Seribu" + createPembilang(number - 1000);
        }
        else if (number < 1000000) {
            hasilBagi = Math.floor(number/1000);
            temp = createPembilang(hasilBagi) + " Ribu" + createPembilang(number % 1000);
        } 
        else if (number < 1000000000) {
            hasilBagi = Math.floor(number/1000000);
            temp =createPembilang(hasilBagi) + " Juta" + createPembilang(number % 1000000);
        } 
        else if (number < 1000000000000) {
            hasilBagi = Math.floor(number/1000000000);
            temp = createPembilang(hasilBagi) + " Miliar" + createPembilang(number % 1000000000);
        } 
        else if (number < 1000000000000000) {
            hasilBagi = Math.floor(number/1000000000000);
            temp = createPembilang(number/1000000000000) + " Triliun" + createPembilang(number % 1000000000000);
        }

        return temp
    }

    function showPembilang(){
        var x = document.getElementById("shwPembilang");
        if (!hidePembilang) {
            x.style.display = "none";
            setHidePembilang(false);
        } else {
            let n = parseInt(prevNumber)
            let result = createPembilang(n)
            setPembilang(result);
            x.style.display = "block";
            setHidePembilang(true);
        }
    }

    const Logout = async (e) => {
        e.preventDefault();
        try {
            const diffTime = new Date().getTime() - new Date(loginTime).getTime()
            await Axios.post(`${API_URL}/logout`, {
                loginTime_id: loginTime_id,
                time: diffTime/1000
            })
            
            dispatch(update({
                username: '',
                user_id: '',
                token: '',
                loginTime_id: ''
            }))
            localStorage.removeItem("authKey")
            navigate('/login')
        } catch (error) {
            if(error.response){
                console.log(error.response.data)
            }
        }
    }
    
    return (
        <div>
            <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand href="#">CALCULATOR</Navbar.Brand>
                <div class="d-flex align-content-center">
                    <p class="p-2 fs-5">Hi, {username}</p>
                    <button class="btn btn-danger" onClick={Logout}>Logout</button>
                </div>
            </Container>
            </Navbar>
            <div className="d-flex justify-content-center align-items-center" id="container">
                <Card className="w-40 m-5 p-2 rounded-5">
                    <Card.Body>
                        <div class="container text-center">
                            <div class="mb-3 mt-3">
                                <input type="number" class="form-control py-3" id="valueNumber" placeholder={prevNumber || "0"} value={value} onChange={(e) => setValue(`${e.target.value}`)} autoFocus onFocus="this.select()" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"/>
                            </div>
                            <div class="d-flex">
                                <p class="text-break fst-italic text-start" id="shwPembilang" style={{width: 250}}>{pembilang}
                                </p>
                            </div>
                            <div class="d-flex flex-row-reverse mb-3">
                                <button type="button" class="btn btn-primary" onClick={showPembilang}>Pembilang</button>
                            </div>
                            <div class="row px-3 my-1 align-items-center">
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="7">7</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="8">8</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="9">9</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={operatorClick} value="divide">/</button>
                                </div>
                            </div>
                            <div className="row px-3 my-1 align-items-center">    
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="4">4</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="5">5</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="6">6</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={operatorClick} value="multiple">x</button>
                                </div>
                            </div>
                            <div class="row px-3 my-1 align-items-center">
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="1">1</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="2">2</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="3">3</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={operatorClick} value="sum">+</button>
                                </div>
                            </div>
                            <div class="row px-3 my-1 align-items-center">
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={handleClick} value="0">0</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={operatorClick} value="min">-</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5 p-2" onClick={deleteClick} onDoubleClick={clearAll}>AC</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-secondary rounded-5" onClick={calculate}>=</button>
                                </div>
                            </div> 
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Calculator