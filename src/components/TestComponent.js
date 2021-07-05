import React, { Component } from 'react';
import './pivotTable.css';


class TestComponent extends Component {
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

        let dataObj =
        {
            category: '',
            subcategories: [
                {
                    subcategory: '',
                    states: [
                        {
                            state: '',
                            sales: ''
                        }
                    ]
                },
            ],

        }

        let categories = [];
        for (let i = 0; i < data.length; i++) {
            categories.push(data[i]['category'])
        }
        categories = [...new Set(categories)];


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

        let subCategories = []
        let sales = []
        let subcategoryObj = {
            subcategory: '',
            states: []
        }
        let steteObj = {
            state: '',
            sales: ''
        }

        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            data = this.state.data;
            for (let x = 0; x < data.length; x++) {
                if (cat === data[x]['category']) {
                    console.log('Sub category', data[x]['subCategory']);
                    dataObj['category'] = data[x]['category'];
                    steteObj['sales'] = data[x]['sales'];
                    steteObj['state'] = data[x]['state'];

                    sales.push(steteObj)

                    subcategoryObj['subcategory']=data[x]['subCategory']
                    subcategoryObj['sales'] = sales

                    subCategories.push(subcategoryObj)
                }
            }

        }

        console.log('sub cat', subCategories);
        // groupedData = this.getUniqueListBy(groupedData, 'category')
    }
    getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    render() {
        return (
            <div>
                <h1>Pinhole Press Test</h1>
                <table className="table">
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

export default TestComponent