import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const DialogDecision = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(props.name);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do you realy want to delele this review ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Delete</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogDecision;