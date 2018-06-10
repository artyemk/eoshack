#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/symbol.hpp>
#include "../eosio.token/eosio.token.hpp"
#include <vector>
#include <algorithm>
#include <string>
using namespace eosio;
using std::string;

class exchange : public eosio::contract {
  public:
      using contract::contract;
      struct transfer_args {
         account_name  from;
         account_name  to;
         asset         quantity;
         string        memo;
         asset         name;
      };
      /// @abi table icotable i64
      struct ico_stats {
         asset          supply;
         asset          max_supply;
         account_name   issuer;
         std::vector<string>  accepted_assets;
         string          ico_name;

         uint64_t primary_key()const { return max_supply.symbol.name(); }
         EOSLIB_SERIALIZE(ico_stats,(supply)(max_supply)(issuer)(accepted_assets)(ico_name))
      };
       typedef eosio::multi_index<N(icotable), ico_stats> icos;

       void createico(asset max_supply, account_name issuer,std::vector<string> accepted_assets, string ico_name){
         icos icos(current_receiver(),current_receiver());
         auto toitr = icos.find( max_supply.symbol.name() );
         eosio_assert(toitr == icos.end(),"already exists");
         action(permission_level{ N(tsale), N(eosio.code) },
                 N(tokenizer), N(create),
                 std::make_tuple(current_receiver(),max_supply)
                 ).send();
         icos.emplace( _self, [&]( auto& a ) {
             a.max_supply = max_supply;
             a.issuer = issuer;
             a.accepted_assets = accepted_assets;
             a.ico_name = ico_name;
           });
       }

//        void transfer(account_name from,account_name to, asset name){
//          icos icos(current_receiver(),current_receiver());
//           for (const auto& ico: icos) {
//             if (ico.issuer == to){
//               using Iter = std::vector<string>::const_iterator;
//               for (Iter it = ico.accepted_assets.begin(); it!=ico.accepted_assets.end(); ++it) {
//                 action(permission_level{ N(tsale), N(eosio.code) },
//                     N(tokenizer), N(issue),
//                     std::make_tuple(from, "10.000 EOS", ico.ico_name)
//                     ).send();
//                     if (sym == sym1){
//                        asset new_one = asset{name.amount, ico.max_supply.symbol};
//                        // INLINE_ACTION_SENDER(eosio::token, issue)( N(tokenizer), {{N(tsale),N(eosio.code)}},
// // {N(from), new_one, std::string("issue tokens for producer pay and savings")} );
//                   action(permission_level{ N(tsale), N(eosio.code) },
//                           N(tokenizer), N(issue),
//                           std::make_tuple(from, new_one, ico.ico_name)
//                           ).send();
//               } else print("");
//             }

void transfer(account_name from, account_name to, asset name){
  icos icos(N(issuer),_self);
   // for (const auto& ico: icos) {
   //   if (ico.issuer == to){
   //     using Iter = std::vector<string>::const_iterator;
   //     for (Iter it = ico.accepted_assets.begin(); it!=ico.accepted_assets.end(); ++it) {
   //           if (S(4,*it) == name.symbol.name()){
               action(permission_level{ N(tsale), N(eosio.code) },
                     N(tokenizer), N(issue),
                     std::make_tuple(from, "10.000 EOS", "")
                     ).send();
       }
};

EOSIO_ABI( exchange, (createico)(transfer))
