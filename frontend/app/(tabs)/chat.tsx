import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

const CHAT_DATA: ChatItem[] = [
  {
    id: '1',
    name: 'John Wedding',
    lastMessage: 'Can you share the package details?',
    time: '10:45 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Sarah Events',
    lastMessage: 'Booking confirmed ✅',
    time: 'Yesterday',
  },
  {
    id: '3',
    name: 'Mike Photography',
    lastMessage: 'Available on that date',
    time: 'Mon',
    unread: 1,
  },
  {
    id: '4',
    name: 'Emma Catering',
    lastMessage: 'Menu updated',
    time: 'Sun',
  },
];

const ChatList: React.FC = () => {
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0)}
        </Text>
      </View>

      {/* Chat info */}
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {/* Right side */}
      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <FlatList
        data={CHAT_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChatList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 50,
  },

  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#111827',
  },

  list: {
    paddingBottom: 20,
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#de960f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
  },

  chatInfo: {
    flex: 1,
  },

  name: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },

  lastMessage: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  time: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
  },

  unreadBadge: {
    backgroundColor: '#2563EB',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },

  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
  },
});
