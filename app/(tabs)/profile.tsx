import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setError('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.text}>{user.email}</Text>
              <Text style={styles.label}>User ID</Text>
              <Text style={styles.text}>{user.uid}</Text>
            </View>
            <TouchableOpacity 
              style={styles.signOutButton}
              onPress={() => auth.signOut()}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setIsLogin(!isLogin)}
            style={styles.linkContainer}
          >
            <Text style={styles.link}>
              {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  button: {
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    paddingVertical: 8,
  },
  link: {
    color: '#FF5A5F',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  error: {
    color: '#FF5A5F',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
});
