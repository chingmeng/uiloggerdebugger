/* eslint-disable react-native/sort-styles */
import { NavigationContainerRef, ParamListBase } from "@react-navigation/core"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { Fragment, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { RootModal } from "./components/modal/root-modal/root.modal"
import { Text } from "./components/text/text"
import { WipScreen } from './components/wip/wip.screen'
import { Console } from "./console"
import { rBLog, rLog, setEnvTag } from "./logger"
import { ConsoleDetail } from "./screens/console_detail"
import { ConsoleListing } from "./screens/console_listing"
import { ConsoleTags } from './screens/console_tags'

export const drawerNav = React.createRef<NavigationContainerRef<ParamListBase>>()

const Stack = createStackNavigator()

export const UILoggerDebugger = ({ show = false, env = '' }) => {
  const [showConsole, setConsole] = useState(false)
  const [modalConfig, setModalConfig] = useState(null)

  useEffect(() => {
    setEnvTag(env);

    console.log = (...a) => {
      if (a.length > 1) {
        const [tag, ...values] = a
        rBLog(tag)(values)
      } else {
        rLog(...a)
      }
    }
  }, [])

  useEffect(() => {
    setModalConfig({
      arrays: Console.getInstance().getArray(),
      rightAction: {
        title: "OK",
      },
      leftAction: {
        title: "CLEAR",
        invoke: () => {
          Console.getInstance().clear()
        },
      },
      children: (
        <View style={{ flexGrow: 1 }}>
          <NavigationContainer
            ref={drawerNav}
            independent={true}
          >
            <Stack.Navigator
              screenOptions={{
                animationEnabled: false,
                headerTintColor: "black",
                headerTitleAlign: 'center',
                headerStyle: {
                    borderBottomWidth: 0,
                    elevation: 0,
                }
              }}
            >
              <Stack.Screen name="ConsoleListing" component={ConsoleListing} />
              <Stack.Screen name="ConsoleTags" component={ConsoleTags} />
              <Stack.Screen name="ConsoleDetail" component={ConsoleDetail} />
              <Stack.Screen name="wip" component={WipScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      ),
    })
  }, [showConsole])

  if (!show || __DEV__ === false) {
    return null
  }

  return (
    <Fragment>
      <RootModal
        arrays={modalConfig?.arrays ?? []}
        onBackdropPress={() => {
          setConsole(!showConsole)
        }}
        containerVisibility={showConsole}
        leftAction={
          modalConfig?.leftAction
            ? {
                title: modalConfig?.leftAction?.title ?? "CANCEL",
                dismissByDefault: modalConfig?.leftAction?.dismissByDefault,
                action: () => {
                  modalConfig.leftAction?.invoke && modalConfig.leftAction?.invoke()
                  modalConfig?.leftAction?.dismissByDefault !== false && setModalConfig(null)
                },
              }
            : null
        }
        rightAction={{
          title: modalConfig?.rightAction?.title || "OK",
          dismissByDefault: modalConfig?.rightAction?.dismissByDefault,
          action: () => {
            modalConfig.rightAction?.invoke && modalConfig.rightAction?.invoke()
            modalConfig?.rightAction?.dismissByDefault !== false && setModalConfig(null)
          },
        }}
      >
        {/* Between header and text */}
        {modalConfig?.children}
      </RootModal>

      <TouchableOpacity style={{ padding: 16 }} onPress={() => setConsole(!showConsole)}>
        <Text text="Console" />
      </TouchableOpacity>
    </Fragment>
  )
}

export const LayoutStyle = StyleSheet.create({
  BUTTON: {
    height: 53,
  },
  HORIZONTAL_FLEX: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  HORIZONTAL_FLEX_CENTER: {
    flexDirection: "row",
    justifyContent: "center",
  },
})
