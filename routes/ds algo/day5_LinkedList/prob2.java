//Find middle of LinkedList

/* Given a non-empty singly linked list with head node head,return the middle node of linked list
INPUT : [1,2,3,4,5]
OUTPUT: node (serialization :[3,4,5])

TC:O(n) SC:O(1)
*/
class Node
{
    int data;
    Node next;
    Node(int x)
    {
        data=x;
        next=null;
    }
}

public class prob2 {
     
    static void middle(Node head)
    {
        if(head==null)
            return;
        Node slow=head;
        Node fast=head;
        while(fast!=null && fast.next!=null)
        {
            slow=slow.next;
            fast=fast.next.next;
        }
        System.out.print("Middle element "+slow.data);
    }

    static void printList(Node head)
	{
		Node curr=head;
		while(curr!=null)
		{
			System.out.print(curr.data+" ");
			curr=curr.next;
		}
		System.out.println();
	}
	
    public static void main(String[] args) 
    {
        Node head=new Node(1);
        head.next=new Node(2);
        head.next.next=new Node(3);
        head.next.next.next=new Node(4);
        head.next.next.next.next=new Node(5);
        head.next.next.next.next.next=new Node(6);
        printList(head);
        middle(head);
    }
}
