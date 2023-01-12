import React from 'react';

class InfoForm extends React.Component{
    constructor()
    {
        super();

        this.state ={
            _id:"",
            Name:"",
            Age:"",
            city:"",
            isEdit:false
        }
    }

    infochange = e =>{
        const { name,value} = e.target;
        this.setState({
            [name] : value
        })
    }

    infoSubmit = e =>{
        if(!this.state.isEdit)
        {
            let data ={
                isEdit:this.state.isEdit,
                Name:this.state.Name,
                Age:this.state.Age,
                city:this.state.city
            }
            this.props.myData(data);
        }
        else{
            // e.preventDefault();
            let data ={
                isEdit:this.state.isEdit,
                _id:this.state._id,
                Name:this.state.Name,
                Age:this.state.Age,
                city:this.state.city
            }
            this.props.myData(data); 
        }

    } 

    componentWillReceiveProps(props){
        console.log(props.setForm);
        if(props.setForm._id != null)
        {
            this.setState({
                isEdit:true,
                _id:props.setForm._id,
                Name:props.setForm.Name,
                Age:props.setForm.Age,
                city:props.setForm.city
            })
        }
    }
    render()
    {
        return(
            <form onSubmit={this.infoSubmit} autoComplete ="off" >
                <div className="mb-3 form-group">
                    <label>Name:</label>
                    <input type="text"
                    className="form-control" 
                    placeholder='Enter your Name'
                    onChange={this.infochange}
                    name = "Name"
                    value={this.state.Name}
                    />
                </div>
                <div className="mb-3 form-group">
                    <label>Age:</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder='Enter your Age'
                    onChange={this.infochange}
                    name = "Age"
                    value={this.state.Age}
                      />
                </div>
                <div className="mb-3 form-group">
                <label>city:</label>
                    <input type="text" className="form-control" placeholder='Enter your City'
                      onChange={this.infochange}
                      name = "city"
                      value={this.state.city}
                      />
                </div>
                <button type="submit" className="btn btn-primary">{this.state.isEdit?'update':'Create'}</button>
            </form>
        )
    }
}
export default InfoForm;