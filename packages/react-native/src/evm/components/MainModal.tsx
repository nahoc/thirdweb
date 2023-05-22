import Modal from "react-native-modal";
import { useModalState } from "../providers/ui-context-provider";
import { ConnectWalletFlow } from "./ConnectWalletFlow/ConnectWalletFlow";
import { Dimensions, StyleSheet, View } from "react-native";
import { useMemo } from "react";
import { ConnectWalletDetailsModal } from "./ConnectWalletDetails/ConnectWalletDetailsModal";
import { CLOSE_MODAL_STATE } from "../utils/modalTypes";
import { ThemeProvider } from "../styles/ThemeProvider";
import { useAppTheme } from "../styles/hooks";

const MODAL_HEIGHT = Dimensions.get("window").height * 0.7;
const DEVICE_WIDTH = Dimensions.get("window").width;

export const MainModal = () => {
  const theme = useAppTheme();

  const { modalState, setModalState } = useModalState();

  const { isOpen, isSheet } = modalState;

  const view = useMemo(() => {
    switch (modalState?.view) {
      case "ConnectWalletFlow":
        return <ConnectWalletFlow />;
      case "WalletDetails":
        return <ConnectWalletDetailsModal />;
      default:
        return null;
    }
  }, [modalState.view]);

  const onBackdropPress = () => {
    setModalState(CLOSE_MODAL_STATE("MainModal"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating={true}
        isVisible={isOpen}
        onBackdropPress={onBackdropPress}
      >
        {isSheet ? (
          <View
            style={[styles.modal, { backgroundColor: theme.colors.background }]}
          >
            <View style={styles.contentContainer}>{view}</View>
          </View>
        ) : (
          view
        )}
      </Modal>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: -20,
    left: -20,
    width: DEVICE_WIDTH,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  contentContainer: {
    maxHeight: MODAL_HEIGHT,
    display: "flex",
  },
});