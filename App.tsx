import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [input, setInput] =  useState('');
  const [history, setHistory] = useState({
    data: []
  });

  const refContainer = useRef(null);

  type ButtonProps = {
    type: string,
    value: string,
  }

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
        fontSize: 40,
        fontWeight: 'bold',
      },
    };

    return (
      <TouchableOpacity
        style = {styles.button}
        underlayColor = {() => assignColor(props)}
        onPress = {() => handleButtonPress(props)}
        onLongPress={() => clearHistory(props)}
      >
        <Text style={styles.buttonText}>{props.value}</Text>
      </TouchableOpacity>
    );
  }

  const handleButtonPress = (props: ButtonProps) => {
    if (props.value==='=') {
      // Solve the expression
      const answer = solve(input); // Undefined and NaN checks are performed in the solve function
      const index = history.data.length.toString();
      // Add input and answer to history state array
      const updatedHistory = history.data.concat({input: input, answer: answer, key: index })
      setHistory({ data: updatedHistory });
      // TODO: Figure out why this is one behind
      refContainer.current.scrollToEnd();
      // Clear input
      setInput('');
    }
    else if (props.value==='C') {
      // Clear input
      setInput('');
    }
    else if (props.value==='<') {
      // Backspace input value
      setInput(input.slice(0, -1));
    }
    else {
      // Add user-selected expression to input field
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
        result = 'Error';
      }
    }
    return result;
  }

  // Bring whatever you pressed on the history view down into the input
  const handleHistoryPress = (item: string) => {
    const inputString = input + item;
    setInput(inputString);
  }

  // Clear the input history
  const clearHistory = (props: ButtonProps) => {
    // Only clear the history if the long press is on the clear key
    if (props.value === 'C') {
      setHistory({
        data: []
      });
    }
  }

  // TODO: Figure out how to type these, maybe find a better solution than index
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.historyRow} key={index}>
        <Text style={styles.defaultText} onPress={() => handleHistoryPress(item.input)} numberOfLines={1} adjustsFontSizeToFit={true}>
          {item.input}
        </Text>
        <Text style={styles.equalSignText}>
          =
        </Text>
        <Text style={styles.defaultText} onPress={() => handleHistoryPress(item.answer)} numberOfLines={1} adjustsFontSizeToFit={true}>
          {parseFloat(item.answer) > 1000000 ? parseFloat(item.answer).toPrecision(5) : item.answer }
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyView}>
        <FlatList
          ref = {refContainer}
          data = {history.data}
          renderItem = {renderItem}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.defaultText} numberOfLines={1} adjustsFontSizeToFit={true}>
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
          <Button type='number' value='<' />
          <Button type='operator' value='=' />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container for the whole app
  container: {
    flex: 1,
    backgroundColor: '#292C33',
  },
  // History view
  historyView: {
    flex: 4,
    marginTop: 25,
    backgroundColor: '#292C33',
    flexDirection: 'column',
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    justifyContent: 'flex-start',
  },
 historyRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  },
  defaultText: {
    flex: 5,
    color: '#FFFFFF',
    marginHorizontal: 5,
    marginVertical: 2,
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  equalSignText: {
    flex: 1,
    color: '#FFFFFF',
    marginVertical: 2,
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Input view
  inputView: {
    flex: 1,
    backgroundColor: '#292C33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Button grid
  buttonGrid: {
    flex: 5,
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
