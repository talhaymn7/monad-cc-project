// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiplayerPayment {
    struct Order {
        uint256 targetAmount; // Toplam restoran hesabı (wei cinsinden)
        uint256 currentAmount; // Havuzda biriken para
        address payable seller; // Restoranın cüzdan adresi
        bool isCompleted; // Ödeme bitti mi?
    }

    mapping(uint256 => Order) public orders; // 9 haneli kod -> Sipariş Bilgisi 

    // Oda sahibi ödeme ekranına geçince bu çalışır
    function createOrder(uint256 _orderId, uint256 _targetAmount, address payable _seller) public {
        orders[_orderId] = Order(_targetAmount, 0, _seller, false);
    }

    // Herkes "Öde"ye bastığında kendi payını yollar
    function contribute(uint256 _orderId) public payable {
        Order storage order = orders[_orderId];
        require(!order.isCompleted, "Siparis bitti bile!");
        order.currentAmount += msg.value; // Gelen parayı havuza ekle
    }

    // Para tamamlanınca restorana yolla
    function paySeller(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.currentAmount >= order.targetAmount, "Para yetersiz!");
        order.isCompleted = true;
        order.seller.transfer(order.currentAmount); // Tüm parayı restorana gönder 
    }
}