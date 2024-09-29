import { Component } from "react";
import "./index.css"


class Register extends Component{
    state = {
        name:"",
        address:'',
        nameEmpty:false,
        addressEmpty:false
    }
    
    nameEl = e=>{
        this.setState({name:e.target.value})
    }
    addressEl = e=>{
        this.setState({address:e.target.value})
    }
    onSubmitRegister =async e=>{
        e.preventDefault()
        const {name,address} = this.state
        if (name==="" && address ===""){
            this.setState({nameEmpty:true,addressEmpty:true})
        }else if (name===""){
            this.setState({nameEmpty:true})
        }else if(address ===""){
            this.setState({addressEmpty:true})
        }else{
            const data = {name,address}
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
            }
            const response = await fetch("/register",options)
            this.setState({name:"",address:"",nameEmpty:false,addressEmpty:false})
        }
        
    }
    render(){
        const {name,address,nameEmpty,addressEmpty} = this.state
        return<div className="box">
            <div className="register-card">
            <h2>Register</h2>
            <form onSubmit={this.onSubmitRegister}>
                <label htmlFor="username">Name</label>
                <input value={name} onChange={this.nameEl} id="username" type="text"/>
                {nameEmpty&&<p className="error">*enter name</p>}
                <label htmlFor="address">Address</label>
                <textarea value={address} onChange={this.addressEl} name="Text1" cols="40" rows="5"></textarea>
                {addressEmpty&&<p className="error">*enter address</p>}
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    }
}


export default Register