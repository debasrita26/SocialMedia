package day4_Hashing;
//Longest Consecutive Sequence(Hashing)

/* Given an unsorted array of integers,find the length of the longest consecutive elements sequence.
INPUT: [100,4,200,1,3,2]
OUTPUT: 4
The longest consecutive elements seqence is[1,2,3,4]. therefore its length is 4.

TC:O(3N) SC:O(N)

STEPS: iterate throgh all the elements and put in into the hash set

*/

import java.util.HashSet;
public class Prob3_Day4 
{
    public int longestConsecutive(int arr[])
    {
        Set<Integer> hs=new HashSet<Integer>();
        for(int num: arr)
        hs.add(num);
        int ls=0;  //computes the maximum of all the sequences we get
        for(int num: arr)
        {
            if(!hs.contains(num-1))
            {
                int current=num;
                int cs=1;// to count the number of iterations
                while(hs.contains(current+1))//finding the next consecutives
                {
                    current++;  //incrementing and we will keep on fnding the consecutives
                    cs++;
                }
                ls=Math.max(ls,cs);
            }
        }
        return ls;
    }
}
