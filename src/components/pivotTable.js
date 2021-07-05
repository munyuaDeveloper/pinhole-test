import React, { Component } from 'react';
import './pivotTable.css'


class PivotTable extends Component {
    state = {
        data: [],
        states: [],
        categories: []
    }
    status = []

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
                    data: [...this.state.data, ...this.prepareDate(myJson)]
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
            sum:0,

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
        // console.log(data)
        // var cats = {}
        // for (let i = 0; i < categories.length; i++) {
        //     const cat = categories[i];
        //
        //     console.log(this.cats)
        //     let subcat = {}
        //     this.cats[cat]=[];
        //     let ar = [];
        //     for (let x = 0; x < data.length; x++) {
        //         if (data[x]['category'] === cat) {
        //             console.log(data[x]['category'])
        //             this.cats[data[x]['category']]={}
        //             ar.push([data[x]['subCategory'],data[x]['state'], data[x]['sales']])
        //             this.cats[cat]=ar
        //         }
        //
        //     }
        // }
        // console.log("alls",console.log(Object.keys(this.cats) ))
        for (let i = 0; i < categories.length; i++) {
            console.log("Category")
            let sum = 0;
            const cat = categories[i];
            let states = [];
            let subcategories = [];
            for (let x = 0; x < data.length; x++) {
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

                    sum+=data[x]['sales']
                    // console.log(sum)

                    subcategories.push(subCategoryObj);


                }
            }
            dataObj = {
                category: cat,
                subcategories: subcategories,
            }
            groupedData.push(dataObj)
            groupedData[i]['sum']=sum
            this.status = groupedData
                console.log("data",groupedData)
            console.log("dta",this.state.data)

        }

        // groupedData = this.getUniqueListBy(groupedData, 'category')
        console.log('all', groupedData);
        return groupedData;
    }
    getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    render() {
        console.log(this.status, "stats")
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
                                                <th key={state} id={state} >{state}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.map(category => (
                                                <tr key={category.category}>
                                                    <td>{category.category}</td>

                                                    <td>
                                                        {
                                                            category.subcategories.map(subcat => (

                                                                <div>
                                                                    {

                                                                        subcat.subcategory
                                                                        // data.category === category ? data.subCategory : ''
                                                                    }
                                                                </div>
                                                            ))
                                                        }

                                                    </td>
                                                    {

                                                        category.subcategories.map(subcat => (

                                                            <td>
                                                                {

                                                                    subcat.states.map(data => (
                                                                        <div>
                                                                            {

                                                                                document.getElementById(data.state).innerHTML === data.state ? data.sales : 'f'
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }

                                                                {
                                                                    category.sum
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