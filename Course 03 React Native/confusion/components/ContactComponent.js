import React, { Component } from 'react';
import {Text} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

//compose emails
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
    constructor(props) {
        super(props)
    }

    sendMail() {
        //compose mail with some parameters
        MailComposer.composeAsync({
            recipients: ['ammarraneez@gmail.com'],  //array of recipients
            subject: 'Enquries',
            body: 'To Whom it may concern'
        })
    }
    
    render() {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card title="Contact Information">
                    <Text style={{margin: 10}}>
                        121, Clear Water Bay Road
                    </Text>
                    <Text style={{margin: 10}}>
                        Clear Water Bay, Kowloon
                    </Text>
                    <Text style={{margin: 10}}>
                        HONG KONG
                    </Text>
                    <Text style={{margin: 10}}>
                        Tel: +852 1234 5678
                    </Text>
                    <Text style={{margin: 10}}>
                        Fax: +852 8765 4321
                    </Text>
                    <Text style={{margin: 10}}>
                        Email:confusion@food.net
                    </Text>
                    <Button title='Send Email' buttonStyle={{ backgroundColor: '#512da8' }} icon={<Icon name="envelope-o" type="font-awesome" color="#fff" />}
                        onPress={() => this.sendMail()}
                    >
                    </Button>
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;