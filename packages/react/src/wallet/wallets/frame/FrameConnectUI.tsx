import { ConnectUIProps, useConnect } from "@thirdweb-dev/react-core";
import { FrameWallet } from "@thirdweb-dev/wallets";
import { ConnectingScreen } from "../../ConnectWallet/screens/ConnectingScreen";
import { isMobile } from "../../../evm/utils/isMobile";
import { useEffect, useRef, useState } from "react";
import {
  BackButton,
  HelperLink,
  ModalDescription,
  ModalTitle,
} from "../../../components/modalElements";
import { Spacer } from "../../../components/Spacer";
import { Flex, ScreenContainer } from "../../../components/basic";
import { ButtonLink } from "../../ConnectWallet/screens/GetStartedScreen";
import { Img } from "../../../components/Img";
import { iconSize } from "../../../design-system";
import { openWindow } from "../../utils/openWindow";

const FrameFailedConnect: React.FC<{
  onBack: () => void;
  walletIconURL: string;
  supportLink: string;
}> = (props) => {
  return (
    <ScreenContainer>
      <BackButton onClick={() => props.onBack()} />
      <Spacer y="lg" />
      {
        <>
          <ModalTitle>Failed to connect to Frame.</ModalTitle>
          <Spacer y="sm" />

          <ModalDescription sm>
            Make sure the desktop app is installed and running. You can download
            Frame from the link below. Make sure to refresh this page once Frame
            is running.
          </ModalDescription>
        </>
      }
      <Spacer y="xl" />
      <Flex flexDirection="column" gap="xs">
        <ButtonLink
          onClick={() => {
            openWindow("https://frame.sh");
          }}
        >
          <Img
            width={iconSize.lg}
            height={iconSize.lg}
            src={props.walletIconURL}
          />
          <span>Download Frame</span>
        </ButtonLink>
      </Flex>
      <Spacer y="xl" />
      <HelperLink target="_blank" href={props.supportLink}>
        Still having troubles connecting?
      </HelperLink>
    </ScreenContainer>
  );
};

export const FrameConnectUI = (props: ConnectUIProps<FrameWallet>) => {
  const [screen, setScreen] = useState<"connecting" | "connect-failed">(
    "connecting",
  );
  const connect = useConnect();
  const connectPrompted = useRef(false);
  const { walletConfig, close, goBack } = props;
  const downloadLink = "https://frame.sh";
  const supportLink = "https://docs.frame.sh";
  const hideBackButton = props.supportedWallets.length === 1;

  useEffect(() => {
    if (connectPrompted.current) {
      return;
    }

    // if loading
    (async () => {
      // if not mobile we connect
      if (!isMobile()) {
        try {
          connectPrompted.current = true;
          setScreen("connecting");
          await connect(walletConfig);
          close();
        } catch (e) {
          setScreen("connect-failed");
        }
      }

      // on mobile we open the website
      else if (isMobile()) {
        openWindow(downloadLink);
      }
    })();
  }, [walletConfig, close, connect, goBack]);

  if (screen === "connecting") {
    return (
      <ConnectingScreen
        hideBackButton={hideBackButton}
        onBack={goBack}
        walletName={walletConfig.meta.name}
        walletIconURL={walletConfig.meta.iconURL}
        supportLink={supportLink}
      />
    );
  }

  if (screen === "connect-failed") {
    return (
      <FrameFailedConnect
        onBack={goBack}
        walletIconURL={walletConfig.meta.iconURL}
        supportLink={supportLink}
      />
    );
  }

  return null;
};
