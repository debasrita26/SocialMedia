//Merge two sorted Linked List

/* Merge two sorted linked lists and return it as a new sorted list.The new list should be made by splicing together the lists of the first two lists.
INPUT : [1,2,3,4,5]
OUTPUT: list (serialization :[3,4,5])

TC:O(n) SC:O(1)
*/
class list
{
    int data;
    list next;
    list(int x)
    {
        data=x;
        next=null;
    }
}

public class prob3 {
    public static void main(String[] args) {
        list head1=new list(10);
        head1.next=new list(20);
        head1.next.next=new list(30);
        printlist(head1);
        list head2=new list(5);
        head2.next=new list(25);
        printlist(head2);
        System.out.println("Merged List :");
        printlist(sortMerge(head1,head2));
    }
    static list sortMerge(list a,list b)
    {
        if(a==null) // if a is null then b is the answer
        return b;
        if(b==null)// if b isnull then a is the answer
        return a;
        list head=null;
        list tail=null;
        if(a.data<b.data)
        {
            head=tail=a;
            a=a.next;
        }
        else
        {
            head=tail=b;
            b=b.next;
        }
        while(a!=null && b!=null)
        {
            if(a.data<b.data)
            {
                tail.next=a;
                tail=a;
                a=a.next;
            }
            else
            {
                tail.next=b;
                tail=b;
                b=b.next;
            }
        }
        if(a==null)
        tail.next=b;
        else
        tail.next=a;
        return a;
    }

    static void printlist(list head)
    {
        list curr=head;
        while(curr!=null)
        {
            System.out.println(curr.data+" ");
            curr=curr.next;
        }
        System.out.println();
    }
}
