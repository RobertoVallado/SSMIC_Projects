using System;
using System.Diagnostics;

namespace CryptographySamples
{
    class Program
    {   
        static void reverseCipher(string message)
        {
            string translated = "";
            int i = message.Length - 1;
            while(i >= 0)
            {
                translated += message[i];
                i--;
            }
            Debug.WriteLine(translated);
        }

        static void ceaserCypher(string message, int amount)
        {
            string result = "";
            for (int i = 0; i < message.Length; i++)
            {
                char c = message[i];
                result += (char)((c + amount - 97) % 26 + 97);
            }
            Debug.WriteLine(result);
        }

        static void xOR(string message)
        {
            char key = 'R';
            int length = message.Length;
            for(int i = 0; i< length; i++)
            {
                message = message.Substring(0, i) + (char)(message[i] ^ key) + message.Substring(i+1);
                Debug.Write(message[i]);
            }
            Debug.WriteLine("");
        }

        static void Main(string[] args)
        {
            reverseCipher("Hello World!");
            ceaserCypher("HELLO THere", 5);
            xOR("Hello Roberto");
        }
    }
}
