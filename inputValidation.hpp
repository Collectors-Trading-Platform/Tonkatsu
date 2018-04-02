/*********************************************************************
** Program Filename: inputValidation.hpp
** Author: Jason Lim
** Date: March 31, 2018
** Description: This is the header file for user input validation
*********************************************************************/

#ifndef INPUTVALIDATION_HPP
#define INPUTVALIDATION_HPP

#include <cstdlib>
#include <string>
#include <typeinfo>
#include <iostream>

using std::cin;
using std::cout;
using std::endl;
using std::string;

char YesOrNoInput();
char charInput();
string stringInput();
int integerInput();
double doubleInput();

#endif