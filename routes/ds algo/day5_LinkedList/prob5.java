//Delete a given Node when a node is given.

/* remove the node whose access is given
INPUT: [10,20,30,40,25] n=30
OUTPUT: 10,20,40,25

TC:O(1) SC:O(1)
*/
class pointer
{
	int data;
	pointer next;
	pointer(int x)
	{
		data=x;
		next=null;
	}
}

public class prob5
{
	static void delNode(pointer ptr)
	{
		pointer temp=ptr.next;
		ptr.data=ptr.data;
		ptr.next=temp.next;
	}
	
	static void printlist(pointer head)
	{
		pointer curr=head;
        while(curr!=null)
        {
        System.out.print(curr.data+" ");
        curr=curr.next;
        }
        System.out.println();
	}
	
	public static void main(String[] args) 
	{
		pointer head=new pointer(10);
    	head.next=new pointer(20);
    	pointer ptr=new pointer(30);
    	head.next.next=ptr;
    	head.next.next.next=new pointer(40);
    	head.next.next.next.next=new pointer(25);
    	//head.next.next.next.next.next=head;
    	printlist(head);
    	delNode(ptr);
    	printlist(head);
	}
}
