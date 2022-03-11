package day4_Hashing;
import java.util.HashMap;

//Longest substring without repeat

/* Given a string str, find the length of the longest substring without repeating characters. 
INPUT : s="abcabcbb"
OUTPUT: 3
the answer is "abc",with the length of 3

TC:O(n log n) SC:O(n)

EXPLAINATION- 
*/

class Prob6_Day4 
{
    static int substringlength(String s)
    {
        HashMap<Character,Integer>m= new HashMap<Character,Integer>();
        int left=0,right=0;
        int n=s.length();
        int len=0;
        while(right<n)
        {
            if(m.containsKey(s.charAt(right)))
                left=Math.max(m.get(s.charAt(right))+1,left);
            m.put(s.charAt(right),right);
            len=Math.max(len,right-left+1);
            right++;
        }
        return len;
    }
    public static void main(String[] args)
    {
         String str="abcabcbb";
         System.out.print(substringlength(str));
    }
}
