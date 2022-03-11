/*package whatever //do not write package name here */

import java.io.*;
import java.util.*;

class GFG {

	
	static void printSub(String str, String curr, int index)
	{
		if(index == str.length())
		{
			System.out.print(curr+" ");
			return;
		}

		printSub(str, curr, index + 1);
		printSub(str, curr+str.charAt(index), index + 1);
	}
    public static void main(String [] args) 
    {
    	String str = "ABC";
    	
    	printSub(str, "", 0);
        
    }

}