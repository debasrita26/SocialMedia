//Find intersection point of Y LinkedList

/* program to find the node at which the intersection point of two singly linked list begins.
TC:O(2M) SC:O(1)
*/
class linked_list
{
	int data;
	linked_list next;
	linked_list(int x)
	{
		data=x;
		next=null;
	}
}


public class prob1 {
    static linked_list IntersectionNode(linked_list l1, linked_list l2)
    {
        if(l1==null || l2==null )
            return null;
        linked_list a=l1;
        linked_list b=l2;
        while(a!=b)
        {
            a=a==null ? l1 : a.next;
            b=b==null ? l2 : b.next;
        }
        return a;
    }

    static void printlist(linked_list head)
	{
		linked_list curr=head;
        while(curr!=null)
        {
        System.out.print(curr.data+" ");
        curr=curr.next;
        }
        System.out.println();
	}
	public static void main(String[] args) 
    {
        linked_list head1=new linked_list(3);
    	head1.next=new linked_list(4);
        head1.next.next=new linked_list(2);
        printlist(head1);
        linked_list head2=new linked_list(5);
    	head2.next=new linked_list(4);
        head2.next.next=new linked_list(7);
        head2.next.next.next=new linked_list(9);
        printlist(head2);
        System.out.println("Intersection point");
        System.out.print(IntersectionNode(head1,head2));
    }
}
