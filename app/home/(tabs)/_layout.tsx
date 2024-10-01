import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/hooks";
import Color from "color";

const tabs = [
  {
    name: "index",
    title: "Home",
    headerShown: false,
    icons: ["home", "home-outline"] as any[],
  },
  {
    name: "saved",
    title: "Saved",
    icons: ["heart", "heart-outline"] as any[],
  },
  {
    name: "settings",
    title: "Settings",
    icons: ["settings", "settings-outline"] as any[],
  },
];

export default function _layout() {
  const { text, textLight, textLighter, bg } = useAppTheme();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: bg,
          shadowColor: Color(textLighter).alpha(.3).hexa(),
          borderColor: Color(textLighter).alpha(.1).hexa(),
          shadowRadius: 1,
          elevation: 1,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {tabs.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerStyle: { backgroundColor: bg },
              headerShown: false,
              title: tab.title,
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ backgroundColor: bg }}
                  className="items-center justify-center h-full mb-4"
                >
                  <View className={`rounded-3xl py-1 px-5 mb-0.5 ${focused ? "bg-primary/20" : ''}`}>
                    <Ionicons
                      name={focused ? tab.icons[0] : tab.icons[1]}
                      size={24}
                      color={focused ? Color(text).alpha(0.7).hexa() : textLight}
                    />
                  </View>
                  <Text
                    style={{
                      color: focused ? text : textLight,
                    }}
                    className={`text-xs text-center`}
                  >
                    {tab.title}
                  </Text>
                </View>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    height: 80,
    shadowColor: "#00000033",
    shadowRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#00000000",
  },
});
