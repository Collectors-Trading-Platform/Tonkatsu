#ifndef MENU_HPP
#define MENU_HPP
#include <iostream>

using std::cin;
using std::cout;
using std::endl;

class Menu {

public:
    Menu();
    ~Menu();
    void displayMenu();
    void getSelection(int &ChoiceByUser);
private:
    int selectedItem;
};


#endif
