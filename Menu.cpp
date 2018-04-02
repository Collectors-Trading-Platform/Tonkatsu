#include "Menu.hpp"

Menu::Menu()
{

}

Menu::~Menu(){
}

void Menu::displayMenu()
{
    cout << "Choose 1 " << endl;
    cout << "Choose 2 " << endl;
}

void getSelection(int &ChoiceByUser){
    cout << "Please enter a choice " << endl;
    cin >> ChoiceByUser;
}

