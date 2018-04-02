#include "inputValidation.hpp"

char YesOrNoInput()
{
    char letter;

    cout << "Yes or No?" << endl;
    cin >> letter;

    while (!((letter == 'y') || (letter == 'Y') || (letter == 'n') || letter == 'N'))
    {
        cout << "Please enter Y or N to continue";
        //clear input
        cin.clear();
        //remove previous input
        cin.ignore(132, '\n');
        //receive input
        cin >> letter;
    }
    //Display letter entered if correct
    if (letter == 'y' || letter == 'Y')
    {
        cout << "You entered " << letter << endl << " continue with program" << endl;
    }
    else if (letter == 'n' || letter == 'N')
        cout << "You entered " << letter << " Exit program" << endl;
    return 0;
}

char charInput()
{
    char ch;
    cout << "Enter a character ";
    cin >> ch;
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    {
        cout << "Character is valid ";
    }
    else
    {
        cout << "Character is not valid ";
    }
    return 0;
}

string stringInput();

int integerInput()
{
    int number = 0;
    cout << "Enter a digit ";
    if (!(cin >> number))
    {
        cout << "Number must be an integer " << endl;
        return 0;
    }
    if (typeid(number) == typeid(int()))
    {
        cout << "Number is a valid integer " << endl;
    }
    else
    {
        cout << "Number is not an integer " << endl;
    }
    return 0;
}

double doubleInput()
{
    double value;
    cout << "Enter a double value ";
    cin >> value;
    if (typeid(value) == typeid(double()))
    {
        cout << "This value is a double " << endl;
    }
    else
    {
        cout << "This value is not a double " << endl;
    }
    return 0;

}