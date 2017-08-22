import React , {Component} from 'react';
import ballons from 'images/ballons.jpg';
import tiger from 'images/tiger.jpg';
import seal from 'images/seal.jpg';

class hello extends Component {
    render() {
        return (
            <div classname ="container">
                <div className = "image-wrapper">
                    <img src={ballons} className ="image-wrapper__image" alt=" "/> 
            </div>
                <div className ="image-wrapper">
                    <img src={tiger} className="image-wrapper__image" alt=" " /> 
            </div>
                <div className="image-wrapper">
                    <img src={seal} className="image-wrapper__image" alt=" " />
            </div>

        </div> 

        )
    }
}

export default hello;