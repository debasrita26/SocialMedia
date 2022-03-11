package day4_Hashing;
//Two sum problem (Day4 Hashing)

/*Given an array of integers nums and integer target,
return the indices of the two numbers such that they add up to target*/
//there should be exactly one element and we cannot use an element twice
// INPUT : nums=[2,7,11,15] , target=9
// OUTPUT : [0,1] (because nums[0]+numss[1]==9,we return [0,1])

// T:O(n) & S:O(n)
// we will get index 1 from the hash table and index 3 which is the current pointer
import java.util.HashMap;
import java.util.Map;
class TwoSum_Day4
{
    public static int[] twosum(int num[],int target)
    {
        int result[]=new int[2];
        Map<Integer,Integer>map=new HashMap<Integer,Integer>();
        for(int i=0;i<num.length;i++)
        {
            if(map.containsKey(target-num[i]))
            {
                result[1]=i;
                result[0]=map.get(target-num[i]);
                return result;
            }
            map.put(num[i], i);
        }
        return result;
    }
    public static void main(String[] args)
    {
        int t=9;
        int a[]={2,7,11,15};
        int p[]= twosum(a,t);
        System.out.println("Output is : "+p);
    }
}



