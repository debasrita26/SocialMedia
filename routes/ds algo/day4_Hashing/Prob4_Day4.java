package day4_Hashing;
//Largest Subarray with 0 sum

/* Given an array having both positive and negative integers. The task is to compute te lengt of the largest subarray with sum 0
INPUT:  N=8
        A[]={15-2,2,-8,1,7,10,23}
OUTPUT: 5

TC:O(n log n) SC:O(n)

STEPS- The largest subarray with sum 0 will be -2,2,-8,1,7
we will need a key-value(prefix sum,index) pair aand then take a variable s=0 to store the prefix sum
and then we will another variable to keep a track of the length of the subarray
the difference between the two indices will give us the length of the longest subarray with sum 0

*/
import java.util.HashMap;
class Prob4_Day4 
{
     static int maxlen(int arr[],int n)
     {
        HashMap<Integer,Integer> m=new HashMap<Integer,Integer>();
        int s=0; //sum
        int maxi=0; //to store the maximum length subarray
        for(int i=0;i<n;i++)
        {
                s=s+arr[i];//adding elements to find the sum
                if(s==0)
                        maxi=i+1;//if we are at index i then the length will be i+1
                else
                {
                        if(m.get(s)!=null)
                                maxi=Math.max(maxi,i-m.get(s));
                        else
                                m.put(s,i);
                }
        }
        return maxi;
      }
      public static void main(String[] args) 
      {
              int arr[]={5, 3, 9, -4, -6, 7, -1};
              int n=arr.length;
              System.out.print("Longest subarray : "+maxlen(arr, n));

      }
}