/*********************************************************************
** Program Filename: Menu.cpp
** Author: Jason Lim
** Date: April 15th, 2018
** Description: This is the implementation file for Langston's Ant Menu
*********************************************************************/


#include "Menu.hpp"

void displayMenu()
{
    int choice = 0;

    cout << "This is the menu for Jason's Langston's Ant Program " << endl;
    cout << "Please pick 1 or 2 " << endl;
    cout << "1. Start Langston's Ant simulation " << endl;
    cout << "2. Quit " << endl;
    cout << "Enter a choice: ";
    cin >> choice;

    while(choice != 1 && choice != 2)
    {
        cin.clear();
        cin.ignore();
        cout << "Try another integer which is 1 or 2 " << endl;
        cin >> choice;
    }

    if (choice == 1)
    {
        cout << "You have chosen to start Langston's Ant " << endl;

    }
    else if (choice == 2)
    {
        cout << "Quit Program " << endl;
    }

}
