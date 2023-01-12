import React from 'react';

class InfoTable extends React.Component{
    constructor()
    {
        super();
    }

    render()
    {
        return(
            <table className='table table-striped table-hover'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Edit</th>
                    <th>Clear</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.getData.length > 0 ?
                    (
                        this.props.getData.map(e =>
                        <tr key={e._id}>
                            <td>{e.Name}</td>
                            <td>{e.Age}</td>
                            <td>{e.city}</td>
                            <td><button className='btn btn-primary'
                            onClick={d =>{
                                this.props.setData(e)
                            }}>Edit</button></td>
                            <td><button className='btn btn-primary'
                             onClick={d =>{
                                this.props.del(e)
                            }}>Clear</button></td>
                        </tr>
                        )
                    ):
                    (
                        <tr>
                            <td>No Data</td>
                        </tr>
                    )
                }
            
            </tbody>
          </table>
        )
    }
}
export default InfoTable;