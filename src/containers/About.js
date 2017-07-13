import React from 'react';

import './styles/About.less'

export default class About extends React.Component {

    render() {

        return (
            <div className="about-wrap">
                <div className="container">
                    <h2>About</h2>
                    <div className="contacts">
                        <p><span>Email:</span><a href="mailto:filip.amirov@gmail.com">filip.amirov@gmail.com</a></p>
                        <p><span>GitHub:</span><a target="_blank" href="https://github.com/AmirovPhilip/react-test-task">github.com/AmirovPhilip/react-test-task</a></p>
                        <p><span>Linkedin</span><a target="_blank" href="https://www.linkedin.com/in/amirov-philip-3386ba142/">www.linkedin.com/in/amirov-philip</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

