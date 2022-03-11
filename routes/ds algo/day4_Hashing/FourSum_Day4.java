package day4_Hashing;
//given an array nums of n integers & an integer target,are there elements a,b,c &d in nums such that a+b+c+d=target
//Find all unique quadruplets in the array which gives the sum of target
// INPUT : nums=[1,0,-1,0,-2,2] , target=0
/* OUTPUT : [
                [-1,0,0,1],
                [-2,-1,1,2],
                [-2,0,0,2]
            ]*/
// T:O(n) & S:O(n)
//first we will sort the array
import java.util.ArrayList;
class FourSum_Day4 
{
    int twosum(int num[],int target)
    {
    ArrayList<Integer> res=new ArrayList<Integer>();
    if(num==null||num.length==0)
        return res;
    int n=num.length;
    Arrays.sort(num);
    for(int i=0;i<n;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            int tg2=target-num[j]-num[i];
            int front=j+1;
            int back=n-1;
            while(front<back)
            {
                int two_sum=num[front]+num[back];
                if(two_sum<tg2)
                    front++;
                else if(two_sum>tg2)
                    back--;
                else
                {
                    List<Integer>quad=new ArrayList<>();
                    quad.add(num[i]);
                    quad.add(num[j]);
                    quad.add(num[front]);
                    quad.add(num[back]);
                    res.add(quad);
                    while(front<back && num[front]==quad.get(2))
                        front++;
                    while(front<back && num[front]==quad.get(3))
                        back--;
                }
            }
            while(j+1<n && num[j+1]==num[j])
                j++;
        }
        while(i+1<n && num[i+1]==num[i])
                i++;
    }
}