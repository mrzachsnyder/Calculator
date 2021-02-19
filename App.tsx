import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default function App() {
  const [input, setInput] =  useState('');
  const [history, setHistory] = useState({
    input: [''],
    ans: [''],
  });

  type ButtonProps = {
    type: string,
    value: string,
  }

  // TODO: Make this a separate component
  const Button = (props: ButtonProps) => {
    // Programatically assign color to the button based on its function
    const assignColor = (props: ButtonProps) => {
      if (props.value === '=' || props.value === 'C') {
        return '#FF7900';
      }
      else if (props.type === 'operator') {
        return '#555555';
      }
      else {
        return '#000000';
      }
    }

    // I try to handle dynamic styles like this, static styles are down in the StyleSheet.create
    const styles = {
      button: {
        margin: 3,
        flex: 4,
        backgroundColor: assignColor(props),
        justifyContent: 'center',
        alignItems:'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
      },
    };

    return (
      <TouchableOpacity
        style = {styles.button}
        underlayColor = {() => assignColor(props)}
        onPress = {() => handleButtonPress(props)}
      >
        <Text style={styles.buttonText}>{props.value}</Text>
      </TouchableOpacity>
    );
  }

  const handleButtonPress = (props: ButtonProps) => {
    if (props.value==='=') {
      const answer = solve(input); // Undefined and NaN checks are performed in the solve function
      // This feels like a sketchy way of adding items to the history state array
      let newInputHistory = history.input;
      newInputHistory.push(input);
      let newAnsHistory = history.ans;
      newAnsHistory.push(answer);
      setHistory(history => ({
        ...history,
        input: newInputHistory,
        ans: newAnsHistory,
      }));
      // Clear the input now that we've solved it
      setInput('');
    }
    else if (props.value==='C') {
      setInput('');
      // Future: double or long press to clear history
    }
    else {
      const inputString = input + props.value;
      setInput(inputString);
    }
  }

  const solve = (input: string) => {
    const expression = input;
    let result = "";
    // Not getting sophisticated yet, just using JavaScript's eval() function
    try {
      result = eval(expression);
    }
    catch (error) {
      if (error instanceof SyntaxError) {
        alert(error.message);
      }
      else {
        alert('Unknown error in solve function.');
        result = 'ERROR';
      }
    }
    return result;
  }

  // Bring whatever you pressed on the history view down into the input
  const handleHistoryPress = (item: string) => {
    const inputString = input + item;
    setInput(inputString);
  }



  return (
    <View style={styles.container}>

      <View style={styles.historyView}>
        <View  style={styles.inputHistory}>
          {history.input.map(item => {
            return (
              <Text style={styles.historyText} onPress={() => handleHistoryPress(item)}>
                {item}
              </Text>
            );
          })}
        </View>
        <View style={styles.ansHistory}>
          {history.ans.map(item => {
            return (
              <Text style={styles.historyText} onPress={() => handleHistoryPress(item)}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          {input}
        </Text>
      </View>
      
      <View style={styles.buttonGrid}>
        <View style={styles.buttonRow}>
          <Button type='operator' value='C' />
          <Button type='number' value='(' />
          <Button type='number' value=')' />
          <Button type='operator' value='/' />
        </View>
        <View style={styles.buttonRow}>
          <Button type='number' value='7' />
          <Button type='number' value='8' />
          <Button type='number' value='9' />
          <Button type='operator' value='*' />
        </View>
        <View style={styles.buttonRow}>
          <Button type='number' value='4' />
          <Button type='number' value='5' />
          <Button type='number' value='6' />
          <Button type='operator' value='-' />
        </View>
        <View style={styles.buttonRow}>
          <Button type='number' value='1' />
          <Button type='number' value='2' />
          <Button type='number' value='3' />
          <Button type='operator' value='+' />
        </View>
        <View style={styles.buttonRow}>
          <Button type='number' value='0' />
          <Button type='number' value='.' />
          <Button type='number' value='-' />
          <Button type='operator' value='=' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container for the whole app
  container: {
    flex: 1,
    backgroundColor: '#292C33',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  // History view
  historyView: {
    flex: 4,
    marginTop: 25,
    backgroundColor: '#292C33',
    flexDirection: 'row',
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
  },
  inputHistory: {
    flex: 4,
    backgroundColor: '#292C33',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  ansHistory: {
    flex: 1.4,
    backgroundColor: '#292C33',
    justifyContent: 'flex-end',
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 5,
  },
  //  Input view (should probably combine with history view)
  inputView: {
    height: 34,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#292C33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  // Button grid
  buttonGrid: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 3,
    marginRight: 3,
    marginLeft: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});
