import React, { Component } from 'react';
import './pivotTable.css'


class PivotTable extends Component {
    state = {
        data: [],
        states: [],
        categories: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    data: [...this.state.data, ...myJson]
                })
                this.prepareDate(this.state.data)
            })
    }

    prepareDate(data) {
        let groupedData = [];

        // let dataObj = [
        //     {
        //         category: '',
        //         subcategories: [
        //             {
        //                 subcategory: '',
        //                 states: [
        //                     {
        //                         state: '',
        //                         sales: ''
        //                     }
        //                 ]
        //             }
        //         ],

        //     }
        // ]

        let dataObj = {
            category: '',
            subcategories: [],

        }
        let subCategoryObj = {
            subcategory: '',
            states: []
        }
        let stateObj = {
            state: '',
            sales: ''
        }

        let categories = [];
        for (let i = 0; i < data.length; i++) {
            categories.push(data[i]['category'])
        }
        categories = [...new Set(categories)];

        console.log('all categories', categories);

        let states = [];
        for (let i = 0; i < data.length; i++) {
            states.push(data[i]['state'])
        }
        states = [...new Set(states)];
        this.setState({
            states: [...this.state.states, ...states]
        })

        this.setState({
            categories: [...this.state.categories, ...categories]
        })

        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            for (let x = 0; x < data.length; x++) {
                let states = [];
                let subcategories = [];
                if (data[x]['category'] === cat) {
                    subCategoryObj = {
                        subcategory: data[x]['subCategory'],
                        states: []
                    }
                    stateObj = {
                        state: data[x]['state'],
                        sales: data[x]['sales']
                    }
                    states.push(stateObj);
                    subCategoryObj = {
                        subcategory: data[x]['subCategory'],
                        states: states
                    }


                    subcategories.push(subCategoryObj);

                    dataObj = {
                        category: cat,
                        subcategories: subcategories
                    }
                    groupedData.push(dataObj)
                }
            }

        }

        // groupedData = this.getUniqueListBy(groupedData, 'category')
        console.log('all', groupedData);
    }
    getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    render() {
        return (
            <div>
                <h1>Pinhole Press Test</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>States</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th >Category</th>
                                            <th >Sub Category</th>
                                            {this.state.states.map((state, index) => (
                                                <th key={index}>{state}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.categories.map((category, index) => (
                                                <tr key={index}>
                                                    <td>{category}</td>

                                                    <td>
                                                        {
                                                            this.state.data.map((data, index) => (

                                                                <div>
                                                                    {
                                                                        data.category === category ? data.subCategory : ''
                                                                    }
                                                                </div>
                                                            ))
                                                        }

                                                    </td>
                                                    {
                                                        this.state.states.map((state, index) => (

                                                            <td>
                                                                {
                                                                    this.state.data.map((data, index) => (
                                                                        <div>
                                                                            {
                                                                                data.category === category ? data.sales : ''
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }

                                                            </td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </td>
                            {/* <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {this.state.states.map((state, index) => (
                                                <th key={index}>{state}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.states.map((state, index) => (

                                                <td>
                                                    {
                                                        this.state.data.map((data, index) => (
                                                            <div>
                                                                {
                                                                    data.state === state ? data.sales : 0
                                                                }
                                                            </div>
                                                        ))
                                                    }

                                                </td>
                                            ))
                                        }


                                    </tbody>
                                </table>
                            </td> */}
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default PivotTable