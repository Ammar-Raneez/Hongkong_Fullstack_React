import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

class Menu extends Component {
    // constructor(props) {     //constructors aren't needed as we dont specifiy any state
    //     super(props);      
    // }

    render() {  
        const menu = this.props.dishes.map(dish => {      
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(dish.id)}>     
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay> 
                    </Card>
                </div>
            );
        });  

        return (
            <div className="row">
                {menu}
            </div>
        );
    }
}

export default Menu;