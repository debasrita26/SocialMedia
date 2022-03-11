// Remove N-th node from back of Linked list

/* Given the head of a linked list,remove the nth node from the end of the list and return it head
INPUT: head=[1,2,3,4,5] n=2
OUTPUT: 1,2,3,5

TC:O(n) SC:O(1)
*/
class listnode
{
    int data;
    listnode next;
    listnode(int x)
    {
        data=x;
        next=null;
    }
}

public class prob4 {

    public static listnode removeNth(listnode head,int n)
    {
        listnode temp=new listnode(5);
        temp.next=head;
        listnode fast=temp;
        listnode slow=temp;
        for(int i=1;i<=n;i++)
        fast=fast.next;
        while(fast.next!=null)
        {
            fast=fast.next;
            slow=slow.next;
        }
        slow.next=slow.next.next;
        return head;
    }

    static void printlist(listnode head)
    {
        listnode curr=head;
        while(curr!=null)
        {
            System.out.println(curr.data+" ");
            curr=curr.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        listnode head=new listnode(1);
        head.next=new listnode(2);
        head.next.next=new listnode(3);
        head.next.next.next=new listnode(4);
        head.next.next.next.next=new listnode(5);
        printlist(head);
        head=removeNth(head, 2);
        printlist(head);
    }
}
