//Reverse a LinkedList
/*  reverse  singly linked list
INPUT : 1->2->3->4->5->null
OUTPUT: 5->4->3->2->1->null

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

public class prob1
{
    static Node reverse(Node head)
    {
        Node curr=head;
        Node prev=null;
        while(curr!=null)
        {
            Node next=curr.next;
            curr.next=prev;
            prev=curr;
            curr=next;
        }
        return prev;
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
        printList(head);
        head=reverse(head);
	    printList(head);
    }
}
