import React, { Component } from 'react';
import styles from './FAQ.module.scss';

import ExpandableListItem from '../../components/ExpandableListItem/ExpandableListItem';
import PageHeadline from '../../components/PageHeadline/PageHeadline';

class FAQ extends Component {

    render() {
        return(
            <div className={styles.FAQ}>

                <PageHeadline>
                    Frequently Asked Questions
                </PageHeadline>

                <div className={styles.FAQ__List}>
                    <ExpandableListItem>
                        <h2>How is my data stored?</h2>
                        <p>
                            Your data in lekkr is stored locally on your device in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a>. The advantages are twofold: the data doesn't leave your device, so you have total control of it and don't have to worry about it being used for advertisment or worse, and it reduces loading time and is available offline since there's no need for the app to communicate with the server.
                        </p>
                    </ExpandableListItem>
                    <ExpandableListItem>
                        <h2>What data is sent to the server?</h2>
                        <p>
                            The only communication with the server is to load the application code. Once the HTML, CSS and JavaScript is loaded everything happens on your device - none of your data is sent to the server, let alone stored there.
                        </p>
                    </ExpandableListItem>
                    <ExpandableListItem>
                        <h2>Can I run my own version of lekkr?</h2>
                        <p>
                            You sure can, I'd even encourage you too. The whole codebase is available on <a href="https://github.com/hueltzen/lekkr">Github</a> and ready for you to look at the code, download it for yourself, host it on your own server and (should you choose to) contribute to the project.
                        </p>
                    </ExpandableListItem>
                    <ExpandableListItem>
                        <h2>Are you still developing this or is this project finished?</h2>
                        <p>
                            lekkr in its current form is only the beginning. I have a ton of features I want to add. Unfortunately this will take time, so stay tuned for some nice quality-of-life improvements.
                        </p>
                    </ExpandableListItem>
                </div>
            </div>
        );
    }

}

export default FAQ;