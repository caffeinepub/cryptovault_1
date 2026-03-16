import Set "mo:core/Set";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type CurrencySymbol = Text;
  type TransactionId = Nat;

  public type Transaction = {
    id : TransactionId;
    coin : CurrencySymbol;
    transactionType : {
      #send;
      #receive;
    };
    amount : Float;
    usdValue : Float;
    timestamp : Time.Time;
    counterpartyAddress : Text;
  };

  module Transaction {
    public func compare(transaction1 : Transaction, transaction2 : Transaction) : Order.Order {
      Nat.compare(transaction1.id, transaction2.id);
    };
  };

  public type Portfolio = {
    btc : Float;
    eth : Float;
    sol : Float;
    ada : Float;
    bnb : Float;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextTransactionId : TransactionId = 0;

  let supportedCurrencies = Set.fromArray(["BTC", "ETH", "SOL", "ADA", "BNB"]);
  let portfolios = Map.empty<Principal, Portfolio>();
  let transactions = Map.empty<Principal, [Transaction]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func updateBalance(currencySymbol : CurrencySymbol, amount : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update balances");
    };

    if (not supportedCurrencies.contains(currencySymbol)) {
      Runtime.trap("Currency not supported");
    };

    let current = switch (portfolios.get(caller)) {
      case (null) { { btc = 0.0; eth = 0.0; sol = 0.0; ada = 0.0; bnb = 0.0 } };
      case (?portfolio) { portfolio };
    };

    let updated = switch (currencySymbol) {
      case ("BTC") { { current with btc = current.btc + amount } };
      case ("ETH") { { current with eth = current.eth + amount } };
      case ("SOL") { { current with sol = current.sol + amount } };
      case ("ADA") { { current with ada = current.ada + amount } };
      case ("BNB") { { current with bnb = current.bnb + amount } };
      case (_) { Runtime.unreachable() };
    };

    portfolios.add(caller, updated);
  };

  public shared ({ caller }) func addTransaction(coin : CurrencySymbol, transactionType : { #send; #receive }, amount : Float, usdValue : Float, counterpartyAddress : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add transactions");
    };

    if (not supportedCurrencies.contains(coin)) {
      Runtime.trap("Currency not supported");
    };

    let transaction : Transaction = {
      id = nextTransactionId;
      coin;
      transactionType;
      amount;
      usdValue;
      timestamp = Time.now();
      counterpartyAddress;
    };

    let existingHistory = switch (transactions.get(caller)) {
      case (null) { [] };
      case (?record) { record };
    };

    let finalHistory = existingHistory.concat([transaction]);
    transactions.add(caller, finalHistory);

    nextTransactionId += 1;
  };

  public query ({ caller }) func getPortfolio() : async Portfolio {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view portfolios");
    };

    switch (portfolios.get(caller)) {
      case (null) { Runtime.trap("Portfolio not found") };
      case (?portfolio) { portfolio };
    };
  };

  public query ({ caller }) func getTransactionHistory() : async [Transaction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view transaction history");
    };

    switch (transactions.get(caller)) {
      case (null) { Runtime.trap("No transactions found") };
      case (?history) { history };
    };
  };
};
