import React, {Component} from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';


class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            showModal: false,
            date: new Date(),
            showDateTime: false,
            mode: 'date'
        }
    }

    handleReservation() {this.toggleModal()}

    toggleModal() {this.setState({showModal : !this.state.showModal})}

    resetForm() {
        this.state = {
            guests: 1,
            smoking: false,
            showModal: false,
            date: new Date(),
            showDateTime: false,
            mode: 'date'
        } 
    }

    render() {
        return(
            <Animatable.View duration={2000} delay={1000} animation="zoomIn">
                {/*picking an item calls the onValueChange that sets the guests value to the picked value*/}
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker style={styles.formItem} selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/ Non-Smoking?</Text>
                        <Switch style={styles.formItem} value={this.state.smoking} trackColor="#512da8"
                            onValueChange={value => this.setState({smoking: value})}
                        >
                        </Switch>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>

                        {/*a nice looking date box picker*/}
                        <TouchableOpacity style={styles.formItem} onPress={() => this.setState({ showDateTime: true, mode: 'date' })}
                            style={{
                                padding: 7,
                                borderColor: '#512DA8',
                                borderWidth: 2,
                                flexDirection: "row"
                            }}     
                        >
                            <Icon type='font-awesome' name='calendar' color='#512DA8' />
                            <Text >{' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }</Text>
                        </TouchableOpacity>

                        {/*actual date picker*/}
                        {this.state.showDateTime && 
                            <DateTimePicker value={this.state.date} mode={this.state.mode} minimumDate={new Date()} minuteInterval={30}
                                onChange={ (event, date) => {
                                    if (date === undefined) {
                                        this.setState({ showDateTime: false });
                                    }
                                    else {
                                        this.setState({
                                            showDateTime: this.state.mode === "time" ? false : true,
                                            mode: "time",
                                            date: new Date(date)
                                        });
                                    }
                                }}
                            />
                        }
                    </View>

                    <View>
                        <Button title="Reserve" color="#512da8" onPress={() => this.handleReservation()} />
                    </View>

                    <Modal animationType={'slide'} transparent={false} visible={this.state.showModal} onDismiss={() => {this.toggleModal(); this.resetForm()}}>
                        <View style={styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date.toString()}</Text>
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>
                    </Modal>
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;