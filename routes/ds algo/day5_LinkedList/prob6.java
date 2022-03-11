// Add two numbers as LinkedList

/*We are given a non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, 
and each of their nodes contais a single digit. Add the two numbers and return the sum as a linked list(i.e in the form of linked list) 
and then we have to return the head
INPUT:First List: [3,4,2]
Second List: [5,6,7,9]
OUTPUT: [7,0,1,0,1] and head=7

explaination- we will create a dummy node and create a copy of it and assign to the dummy node
we will carry a variable sum and a variable carry
l1 will stand at the first index of first linked list
l2 will stand at the first index of the second list
 

TC:O(1) SC:O(1)
*/
class node_s
{
	int data;
	node_s next;
	node_s(int x)
	{
		data=x;
		next=null;
	}
}

public class prob6 
{
    public static node_s AddtwoNumbers(node_s n1,node_s n2)
    {
        node_s dummy= new node_s(10);
        node_s temp=dummy;
        int carry=0;
        while(n1!=null || n2!=null || carry==0 )
        {
            int sum=0;
            while(n1!=null)
            {
                sum=sum+n1.data;
                n1=n1.next;
            }
            while(n2!=null)
            {
                sum=sum+n2.data;
                n2=n2.next;
            }
            sum=sum+carry;
            carry=sum/10;
            node_s np=new node_s(sum%10);
            temp.next=np;
            temp=temp.next;

        }
        return dummy.next;
    }

    static void printlist(node_s head)
	{
		node_s curr=head;
        while(curr!=null)
        {
        System.out.print(curr.data+" ");
        curr=curr.next;
        }
        System.out.println();
	}
	public static void main(String[] args) 
    {
        node_s head1=new node_s(3);
    	head1.next=new node_s(4);
        head1.next.next=new node_s(2);
        printlist(head1);
        node_s head2=new node_s(5);
    	head2.next=new node_s(6);
        head2.next.next=new node_s(7);
        head2.next.next.next=new node_s(9);
        printlist(head2);
        System.out.println("Sum of the two linked lists are :");
        head2=AddtwoNumbers(head1,head2);
        printlist(head2);
    }
}
