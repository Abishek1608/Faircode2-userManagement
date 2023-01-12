import React from 'react';
import InfoForm from './form';
import InfoTable from './table';
import axios from 'axios';

class App extends React.Component{
    constructor()
    {
        super();
        this.state ={
            data:[],
            editData:[]
        }
    }

    Create = data =>{
        if(!data.isEdit)
        {
            axios.post('http://localhost:5000/info',data).then( res => {
            this.getall();
        })
        }
        else
        {
            axios.put('http://localhost:5000/info/update',data).then( res => {
                this.getall();
                console.log(data);

            })  

        }
        
    }

    update = data =>{
        console.log(data);
        this.setState({
            editData:data
        })
    }

    componentDidMount(){
        this.getall();

    }

    getall(){
        axios.get('http://localhost:5000/info').then(res =>{
            console.log(res.data);
            this.setState({
                data:res.data
            })
        })
    }

    del = data =>{
        var option = window.confirm(`Are you sure you want to delete ${data.Name}`)
        if(option){
            axios.delete(`http://localhost:5000/info/del/${data._id}`).then(res =>{
                console.log(res);
                this.getall();
            })

        }

        console.log(data);

    }

    render()
    {
        return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-4'>
                        <InfoForm myData={this.Create} setForm ={this.state.editData}/>
                    </div>
                    <div className='col-5'>
                        <InfoTable getData={this.state.data} setData={this.update} del ={this.del}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;